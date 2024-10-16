'use client';
import { useSession } from "@clerk/nextjs";
import {  useEffect, useState } from "react";
// import { useChat } from 'ai/react';
type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const { session } = useSession();
  const {input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      chatId: chatId,
    }
  });
  const [loading, isLoading] = useState(true);
  
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={e=>{handleSubmit(e,{options:{body:{chatId:chatId}}})}} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={handleInputChange}
          disabled={!session}
          className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${!loading && "animate-pulse"
            }`}
        />
        {loading ? (
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
  );
}

export default ChatInput;
