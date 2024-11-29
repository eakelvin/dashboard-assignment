import { ChartConfig } from "@/components/ui/chart";
import {
    LucideIcon, LayoutDashboard, ChartColumnBig, Users, Wallet, PackageOpen, MailQuestion, Cog, FileLock2
} from "lucide-react";

interface SubItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

interface SideBarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: SubItem[];
}

export const items: SideBarItem[] = [
    {
        name: "Overview",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Statistics",
        path: "/statistics",
        icon: ChartColumnBig
    },
    {
        name: "Customers",
        path: "/customers",
        icon: Users
    },
    {
        name: "Products",
        path: "/products",
        icon: PackageOpen
    },
    {
        name: "Messages",
        path: '/messages',
        icon: MailQuestion
    },
    {
        name: "Wallet",
        path: '/wallet',
        icon: Wallet
    },
];

export const general: SideBarItem[] = [
    {
        name: "Settings",
        path: '/settings',
        icon: Cog
    },
    {
        name: "Security",
        path: '/security',
        icon: FileLock2
    }
];

export const revenueConfig = {
    revenue: {
        label: "Income",
        color: "#052e16",
    },
    expense: {
        label: "Expenses",
        color: "#a3e635",
    },
} satisfies ChartConfig;

export const performanceConfig = {
    visitors: {
        label: "Visitors",
        color: ""
    },
    sales: {
        label: "Sales",
        color: "hsl(var(--chart-5))",
    },
    view: {
        label: "View",
        color: "#15803d",
    },
    count: {
        label: "Count",
        color: "#a3e635",
    },
} satisfies ChartConfig;

export const salesConfig = {
    desktop: {
        label: "Desktop",
        color: "#a3e635",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "#a3e635",
    },

}