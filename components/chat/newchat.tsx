'use client';
import useCreateChat from "@/hooks/useCreateChat";
import { useSession } from "@clerk/nextjs";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const NewChat = () => {
    const router = useRouter();
    const newChat = useCreateChat();
    const createNewChat = async () => {
        newChat.onOpen();
    }
    return (  
        <div onClick={createNewChat} className="border-gray-700 border chatRow">
            <PlusIcon className="h-4 w-4"/>
            <p>New chat</p>
        </div>
    );
}
 
export default NewChat;