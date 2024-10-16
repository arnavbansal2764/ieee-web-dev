"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect";



function Message({ message }: any) {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image src={message.user.avatar} alt="" width={500}
          height={500} className="h-8 w-8" />
        <p className="pt-1 text-sm">
          <Typewriter onInit={(typewriter) => {
            typewriter
              .typeString(message.data())
              .pauseFor(1500)
              .start();
          }} />
        </p>
      </div>
    </motion.div>
  );
}

export default Message;