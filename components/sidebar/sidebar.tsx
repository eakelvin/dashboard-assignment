"use client"

import { useEffect, useState } from "react";
import SidebarItem from "./item";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { general, items } from "@/utils/data";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.getElementById("sidebar");
            if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
                setSidebarVisible(false);
            }
        };

        if (sidebarVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarVisible]);

    return (
        <>
            <div className="fixed top-0 right-0 w-full bg-white p-4 flex items-center justify-between z-[30]">
                <div className="flex items-center">
                    <Menu
                        size={24}
                        className="mr-5 font-extrabold lg:hidden"
                        onClick={toggleSidebar}
                    />
                    <div className="lg:ml-[260px]">
                        <p className="font-bold text-2xl">Sales Admin</p>
                    </div>
                </div>
            </div>

            <div
                id="sidebar"
                className={`lg:left-0 ${sidebarVisible ? "left-0" : "-left-72"} fixed top-0 h-dvh w-[250px] bg-lime-950 text-white shadow-lg duration-500 z-[99] p-2 px-5 `}
            >
                <div className="lg:hidden flex justify-end" onClick={toggleSidebar}>
                    <X />
                </div>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col pb-2 PX-1">
                            MENU
                        </div>

                        <div className="flex flex-col gap-y-2" onClick={closeSidebar}>
                            {items.map((item) => (
                                <SidebarItem key={item.path} item={item} />
                            ))}
                        </div>

                        <div className="px-1">
                            <Separator className="mb-2" />
                            <p>GENERAL</p>
                        </div>

                        <div className="flex flex-col" onClick={closeSidebar}>
                            {general.map((item) => (
                                <SidebarItem key={item.path} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Separator className="mb-2" />
                        <div className="flex mt-1 sm:mb-0 mb-6 flex-row justify-between items-center gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <Avatar>
                                    <AvatarFallback className="bg-lime-400" />
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold -mt-0.5">
                                        firstname lastname
                                    </p>
                                    <p className="text-sm">email@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar