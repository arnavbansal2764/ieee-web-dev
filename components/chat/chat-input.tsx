'use client';
import { useSession } from "@clerk/nextjs";
import { useState } from "react";
import axios from 'axios';

type Props = {
  pdfId: string;
};

const ChatInput = ({ pdfId }: Props) => {
  const { session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return; // Prevent sending empty messages

    setLoading(true);

    try {
      const response = await axios.post(`/api/${pdfId}/sendMessage`, {
        pdfId,
        content: input,
      });

      if (response.status === 201) {
        console.log('Message sent:', response.data);
        setInput(''); // Clear the input field
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={handleSubmit} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={handleInputChange}
          disabled={!session}
          className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${loading && "animate-pulse"}`}
        />
        <button
          type="submit"
          disabled={!session || loading}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? (
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
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
