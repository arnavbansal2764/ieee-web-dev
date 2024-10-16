'use client';
import { useSession } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

type Message = {
  id: string;
  content: string;
  sender: string;
  createdAt: string;
};

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  // Fetch messages for the given chatId (pdfId) on component mount
  async function fetchMessages(pdfId: string) {
    try {
      const response = await axios.get(`/api/messages/${pdfId}`);

      if (response.status === 200) {
        console.log('Messages:', response.data.messages);
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [chatId]);

  // Scroll to the bottom whenever new messages are loaded
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages.length === 0 ? (
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
      ) : (
        messages.map((message) => (
          <div key={message.id} className="p-4 text-white">
            <p className="font-bold">{message.sender}</p>
            <p>{message.content}</p>
          </div>
        ))
      )}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
