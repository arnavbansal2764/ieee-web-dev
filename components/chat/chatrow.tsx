
import { useSession } from "@clerk/nextjs";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    id: string
}
const ChatRow = ({ id }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { session } = useSession();
    const [active, setActive] = useState(false);
  
    useEffect(() => {
        if (!pathname) {
            return;
        }
        setActive(pathname.includes(id));
    }, [pathname,id]);

    // const removeChat = async() => {
    //     await deleteDoc(doc(db,'users', session?.user?.username!, 'chats',id));
    //     router.replace('/chat');
    // }
    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncate">New chat</p>
            <TrashIcon onClick={()=>{}} className="h-5 w-5 text-gray-700 hover:text-red-700" />        </Link>
    );
}

export default ChatRow;