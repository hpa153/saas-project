import { DiscordMessageProps } from "@/components/DiscordMessage";

const ads = [
  "Real-time Discord alerts for critical events",
  "Buy once, use forever",
  "Track sales, new users, or any other event",
];

const discordMessages: DiscordMessageProps[] = [
  {
    avatarSrc: "/brand-asset-profile-picture.png",
    avatarAlt: "Saas Pro Avatar",
    username: "Saas Pro",
    timestamp: "Today at 12:35PM",
    badgeText: "SignUp",
    badgeColor: "green",
    title: "👤 New user signed up",
    content: {
      name: "Mateo Ortiz",
      email: "m.ortiz19@gmail.com",
    },
  },
  {
    avatarSrc: "/brand-asset-profile-picture.png",
    avatarAlt: "Saas Pro Avatar",
    username: "Saas Pro",
    timestamp: "Today at 12:45PM",
    badgeText: "Revenue",
    badgeColor: "yellow",
    title: "💰 Payment received",
    content: {
      amount: "$49.00",
      email: "zoe.martinez2001@email.com",
      plan: "PRO",
    },
  },
  {
    avatarSrc: "/brand-asset-profile-picture.png",
    avatarAlt: "Saas Pro Avatar",
    username: "Saas Pro",
    timestamp: "Today at 5:11PM",
    badgeText: "Milestone",
    badgeColor: "grey",
    title: "🚀 Revenue Milestone Achieved",
    content: {
      recurringRevenue: "$5.000 USD",
      growth: "+8.2%",
    },
  },
];

export { ads, discordMessages };
