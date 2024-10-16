'use client';
import Chat from "@/components/chat/chat";
import ChatInput from "@/components/chat/chat-input";
import { useSession } from "@clerk/nextjs";
// import { useChat } from "ai/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { stringify } from "querystring";
import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import logo from '@/public/logo.png'
import ReactMarkdown from 'react-markdown';
type Props = {
    params: {
        id: string;
    }
}
const ChatPage =  ({ params: { id } }: Props) => {
    
    const { session } = useSession();
    
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Chat chatId = {id}/>
            <ChatInput pdfId={id}/>          
        </div>
        
    );
}

export default ChatPage;