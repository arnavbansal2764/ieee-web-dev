'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const Navbar = () => {
    const router = useRouter();

    return (
        <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
                <a

                    className="h-auto w-auto flex flex-row items-center"
                >
                    {/* <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          /> */}

                    <span onClick={() => router.push("/")} className="font-bold ml-[10px] hidden md:block text-gray-300">
                        LawGPT
                    </span>
                </a>
                <div className="w-auto h-full flex flex-row items-center justify-between md:mr-20">
                    <div className="flex items-center space-x-0 justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] rounded-full text-gray-200">
                        <a onClick={() => router.push("/about-us")} className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-l-full shadow-2xl group">
                            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                            <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                            <span className="relative">About Us</span>

                        </a>
                        <a href='/chat' className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white  shadow-2xl group">
                            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                            <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                            <span className="relative">Chat</span>

                        </a>
                        <a onClick={() => router.push("/pricing")} className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-r-full shadow-2xl group">
                            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                            <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                            <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                            <span className="relative">Pricing</span>

                        </a>

                    </div>
                </div>

                <div className="flex flex-row">
                    <SignedOut>
                        <a onClick={() => router.push("/sign-in")} className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white"><SignInButton /></span>
                        </a>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
};


export default dynamic(()=>Promise.resolve(Navbar),{ssr:false});