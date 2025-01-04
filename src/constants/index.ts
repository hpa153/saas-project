import { DiscordMessageProps } from "@/components/DiscordMessage";
import { Gem, Home, Key, LucideIcon, Settings } from "lucide-react";

const ADS = [
  "Real-time Discord alerts for critical events",
  "Buy once, use forever",
  "Track sales, new users, or any other event",
];

const DISCORD_MESAGES: DiscordMessageProps[] = [
  {
    avatarSrc: "/brand-asset-profile-picture.png",
    avatarAlt: "SaasPro Avatar",
    username: "SaasPro",
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
    avatarAlt: "SaasPro Avatar",
    username: "SaasPro",
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
    avatarAlt: "SaasPro Avatar",
    username: "SaasPro",
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

const HOME_CODE_SNIPPET = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "phuonganhhoang@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`;

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
];

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

const FREE_QUOTA = {
  maxEventsPerMonth: 100,
  maxEventCategories: 3,
};

const PAID_QUOTA = {
  maxEventsPerMonth: 10000,
  maxEventCategories: 20,
};

const INCLUDED_FEATURES = [
  "10.000 real-time events per month",
  "20 event categories",
  "Advanced analytics and insights",
  "Priority support",
];

export {
  ADS,
  DISCORD_MESAGES,
  HOME_CODE_SNIPPET,
  EMOJI_OPTIONS,
  SIDEBAR_ITEMS,
  FREE_QUOTA,
  PAID_QUOTA,
  INCLUDED_FEATURES,
};
