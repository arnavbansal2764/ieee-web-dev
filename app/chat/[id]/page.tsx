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
    // const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat();
    const { session } = useSession();
    
    return (
        // <div className="flex flex-col h-screen overflow-hidden">
        //     <Chat chatId = {id}/>
        //     <ChatInput chatId={id}/>          
        // </div>
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {messages.length === 0 && (
                    <>
                        <p className="mt-10 text-center text-white">
                            Type a prompt in below to get started
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 mx-auto mt-5 text-white animate-bounce"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </>
                )}
                {messages.map(message => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className={`py-5 text-white `}
                    >
                        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
                            <Image
                                //@ts-ignore
                                src={message.role === 'user' ? session?.user?.imageUrl : `/logo.png` }
                                alt={message.role === 'user' ? 'User Avatar' : 'Gemini Logo'}
                                width={500}
                                height={500}
                                className="h-8 w-8"
                            />
                            <p className="pt-1 text-xl">
                                {message.role === 'user' ? (
                                    message.content

                                ) : (
                                    <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 4 }}
                                  >
                                    
                                 <ReactMarkdown>
                                
                                {message.content}
                                 </ReactMarkdown>
                                  </motion.div>  
                                )}
                            </p>
                        </div>
                    </motion.div>
                ))}

            </div>
            <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">

                <form onSubmit={handleSubmit} className="p-5 space-x-5 flex">
                    <input
                        name="prompt"
                        placeholder="Type your message here..."
                        value={input}
                        onChange={handleInputChange}
                        id="input"
                        disabled={!session}
                        className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${isLoading && "animate-pulse"
                            }`}
                    />
                    {!isLoading ? (
                        <button
                            type="submit"
                            disabled={!session}
                            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 -rotate-45"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={stop}
                            type="submit"
                            disabled={!session}
                            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 animate-spin"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ChatPage;