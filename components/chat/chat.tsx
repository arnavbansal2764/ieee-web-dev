"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useCitations from "@/hooks/useCitations";

type Message = {
  id: string;
  content: string;
  role: string;
  createdAt: string;
  citations: any[];
};

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fiveQues, setFiveQues] = useState<string[]>([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const citation = useCitations();

  // Fetch messages and fiveQues for the given chatId (pdfId)
  async function fetchMessages(pdfId: string) {
    try {
      const response = await axios.get(`/api/messages/${pdfId}`);
      if (response.status === 200) {
        setMessages(response.data.messages);
        setFiveQues(response.data.fiveQues.filter((item: string) => item && !item.startsWith("Answer:")));
      }
    } catch (error) {
      console.error("Error fetching messages and questions:", error);
    }
  }

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
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

  const handleCitationsClick = (citations: any[]) => {
    citation.onOpen(citations);
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
      {messages.length === 0 ? (
        <div>No messages</div>
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            {fiveQues.map((question, index) => (
              <div
                key={index}
                className="relative group bg-gray-500 text-white p-6 rounded-lg text-center flex-1"
              >
                {question}

                {/* Tooltip for additional information (if needed) */}
                <div className="absolute left-0 top-full mt-2 w-full bg-white text-gray-800 p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-2">
                  {/* You can add more detailed info here if needed */}
                  Additional info for {question}
                </div>
              </div>
            ))}
          </div>
          {messages.map(
            (message) =>
              message.role !== "system" && (
                <div
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  key={message.id}
                >
                  {message.role === "user" && (
                    <div className="p-3 mb-4 max-w-lg rounded-xl bg-blue-500 text-white self-end">
                      {message.content}
                    </div>
                  )}
                  {message.role !== "user" && (
                    <div className="p-3 mb-4 max-w-lg rounded-xl bg-gray-300 text-black self-start">
                      {message.content}
                      {message.citations && message.citations.length > 0 && (
                        <button
                          className="px-4 mt-4 py-2 bg-indigo-400 rounded-full"
                          onClick={() => handleCitationsClick(message.citations)}
                        >
                          Citations
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
          )}
        </>
      )}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
