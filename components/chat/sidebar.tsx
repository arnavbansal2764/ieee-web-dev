'use client';
import { UserButton, useSession } from "@clerk/nextjs";
import NewChat from "./newchat";
import ChatRow from "./chatrow";
import { usePathname } from "next/navigation";

const SideBar = () => {
    const { session } = useSession();

    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-20 h-20", // Custom width and height
            userButtonPopoverCard: "bg-blue-100",
            userButtonPopoverActionButton: "text-black", // Custom text color for action buttons
        },
    };
    return (
        <div className="p-2 flex flex-col h-screen ">
            <div className="flex-1">
                <div>
                    <NewChat />
                    
                    {/* {chats?.docs.map(chat => (

                        <ChatRow key={chat.id} id={chat.id} />
                    ))} */}
                </div>
            </div>
            <div className="mx-auto pb-10 hover:opacity-50">
                <UserButton appearance={userButtonAppearance} />
            </div>
        </div>
    );
}

export default SideBar;