import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { FREE_QUOTA, PAID_QUOTA } from "@/constants";
import { DiscordClient } from "@/lib/discordClient";
import { REQUEST_VALIDATOR } from "@/lib/validators";
import { toCapitalizedString } from "@/lib/utils";

const POST = async (req: NextRequest) => {
  try {
    // Validate user
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Inavalid auth header format!" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        { message: "Invalid API Key!" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { apiKey },
      include: { EventCategories: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid API Key!" },
        { status: 401 }
      );
    }

    if (!user.discordId) {
      return NextResponse.json(
        {
          message: "Please enter your discord ID in your account settings",
        },
        { status: 403 }
      );
    }

    // Validate quota amount
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const quota = await db.quota.findFirst({
      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
    });

    const quotaLimit =
      user.plan === "FREE"
        ? FREE_QUOTA.maxEventsPerMonth
        : PAID_QUOTA.maxEventsPerMonth;

    if (quota && quota.count >= quotaLimit) {
      return NextResponse.json(
        {
          message:
            "Monthly quota reached. Please upgrade your plan for more events",
        },
        { status: 429 }
      );
    }

    // Send Discord message
    const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN);
    const dmChannel = await discord.createDM(user.discordId);
    let requestData: unknown;

    try {
      requestData = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          message: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const validationResult = REQUEST_VALIDATOR.parse(requestData);
    const category = user.EventCategories.find(
      (cat) => cat.name === validationResult.category
    );

    if (!category) {
      return NextResponse.json(
        {
          message: `You dont have a category named "${validationResult.category}"`,
        },
        { status: 404 }
      );
    }

    const eventData = {
      title: `${category.emoji || "🔔"} ${toCapitalizedString(category.name)}`,
      description:
        validationResult.description ||
        `A new ${category.name} event has occurred!`,
      color: category.color,
      timestamp: new Date().toISOString(),
      fields: Object.entries(validationResult.fields || {}).map(
        ([key, value]) => {
          return {
            name: key,
            value: String(value),
            inline: true,
          };
        }
      ),
    };

    // Create db entry
    const event = await db.event.create({
      data: {
        name: category.name,
        formattedMessage: `${eventData.title}\n\n${eventData.description}`,
        userId: user.id,
        fields: validationResult.fields || {},
        eventCategoryId: category.id,
      },
    });

    try {
      await db.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "DELIVERED" },
      });

      // await db.quota.upsert({
      //   where: { userId: user.id, month: currentMonth, year: currentYear },
      //   update: { count: { increment: 1 } },
      //   create: {
      //     userId: user.id,
      //     month: currentMonth,
      //     year: currentYear,
      //     count: 1,
      //   },
      // });

      // Fixed upsert issue when searching for multiple fields with binding
      const quota = await db.quota.findFirst({
        where: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
        },
      });

      if (quota) {
        await db.quota.update({
          where: { id: quota.id },
          data: { count: quota.count + 1 },
        });
      } else {
        await db.quota.create({
          data: {
            userId: user.id,
            month: currentMonth,
            year: currentYear,
            count: 1,
          },
        });
      }

      await discord.sendEmbed(dmChannel.id, eventData);
    } catch (err) {
      await db.event.update({
        where: { id: event.id },
        data: { deliveryStatus: "FAILED" },
      });

      return NextResponse.json(
        {
          message: "Error processing event",
          eventId: event.id,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Event processed successfully",
      eventId: event.id,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.message }, { status: 422 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export { POST };
