import Stripe from "stripe";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? "",
    process.env.STRIPE_WEBHOOK_SECRET ?? ""
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { userId } = session.metadata || { userId: null };

    if (!userId) {
      return new Response("Invalid metadata", { status: 400 });
    }

    await db.user.update({
      where: { id: userId },
      data: { plan: "PRO" },
    });
  }

  return new Response("OK");
}
