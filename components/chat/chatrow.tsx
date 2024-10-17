import { useSession } from "@clerk/nextjs";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

type Props = {
    id: string;
    onChatDeleted: (id: string) => void;
    name : String;// Prop to notify the parent component about deletion
};

const ChatRow = ({ id, onChatDeleted, name }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { session } = useSession();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!pathname) {
            return;
        }
        setActive(pathname.includes(id));
    }, [pathname, id]);

    const handleDelete = async (e: React.MouseEvent<SVGSVGElement>) => {
        try {
            await axios.delete(`/api/chat/${id}`); 
            onChatDeleted(id); 
        } catch (error) {
            console.error("Error deleting chat:", error); 
        }
    };

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncate">{name}</p>
            <TrashIcon onClick={handleDelete} className="h-5 w-5 text-gray-700 hover:text-red-700 cursor-pointer" />
        </Link>
    );
};

export default ChatRow;
