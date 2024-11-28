"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SubItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

const Menu = ({ item }: { item: SubItem }) => {
    const { name, path, icon: Icon } = item;

    const router = useRouter();
    const pathname = usePathname();

    const onClick = () => {
        router.push(path);
    };

    const isActive = useMemo(() => {
        return path === pathname;
    }, [path, pathname]);

    return (
        <div
            className={`cursor-pointer hover:text-sidenav-subactive hover:font-bold ${isActive && "text-sidenav-subactive font-bold"}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <Icon size={20} />
                {name}
            </div>
        </div>
    )
}

export default Menu

