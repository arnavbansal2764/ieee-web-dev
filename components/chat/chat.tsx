"use client";
import { useSession } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useCitations from "@/hooks/useCitations";

type Message = {
  id: string;
  content: string;
  role: string;
  createdAt: string;
};

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const citation = useCitations();
  // Fetch messages for the given chatId (pdfId) on component mount
  async function fetchMessages(pdfId: string) {
    try {
      const response = await axios.get(`/api/messages/${pdfId}`);

      if (response.status === 200) {
        console.log("Messages:", response.data.messages);
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
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
  const questions = [
    { title: "Question 1", info: "This is some info about Question 1." },
    { title: "Question 2", info: "This is some info about Question 2." },
    { title: "Question 3", info: "This is some info about Question 3." },
    { title: "Question 4", info: "This is some info about Question 4." },
    { title: "Question 5", info: "This is some info about Question 5." },
  ];
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
      {messages.length === 0 ? (
        <>
          <div className="flex justify-between space-x-4 p-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="relative group bg-gray-500 text-white p-6 rounded-lg text-center flex-1"
              >
                {question.title}

                {/* Tooltip for additional information */}
                <div className="absolute left-0 top-full mt-2 w-full bg-white text-gray-800 p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-2">
                  {question.info}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        messages.map(
          (message) =>
            message.role !== "system" && (
              <div
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "user" && (
                  <div
                    key={message.id}
                    className={`p-3 mb-4 max-w-lg rounded-xl bg-blue-500 text-white self-end`}
                  >
                    <p className="text-xs font-semibold text-gray-300 mb-1">
                      {message.role}
                    </p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                )}
                {message.role != "user" && (
                  <div
                    key={message.id}
                    className={`p-3 mb-4 max-w-lg rounded-xl bg-gray-800 text-gray-200`}
                  >
                    <p className="text-xs font-semibold text-gray-300 mb-1">
                      {message.role}
                    </p>
                    <p className="text-sm">{message.content}</p>
                    <button
                      className="px-4 mt-4 py-2 bg-indigo-400 rounded-full "
                      onClick={() => citation.onOpen()}
                    >
                      Citations
                    </button>
                  </div>
                )}
              </div>
            )
        )
      )}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chat;
