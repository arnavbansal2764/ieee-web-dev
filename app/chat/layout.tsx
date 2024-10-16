import SideBar from "@/components/chat/sidebar";
import React from "react";

export default function ChatLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
            </div>
            {/* clientprovider */}
            <div className="bg-[#343541] flex-1">{children}</div>
        </div>
    );
}
