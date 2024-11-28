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
]