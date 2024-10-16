
import { auth } from "@clerk/nextjs/server";
import { AcademicCapIcon, BoltIcon, BookOpenIcon, ExclamationTriangleIcon, ScaleIcon, SunIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";

const ChatPage = () => {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="text-white flex flex-col items-center justify-center h-screen px-2">
            <Image src='/bannerfinal.png' alt="logo" width={500} height={500} className="" />
            <div className="flex space-x-3 text-center">
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <AcademicCapIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Explain the concept of due process&quot;</p>
                        <p className="infoText">&quot;What are the key differences between civil and criminal law?&quot;</p>
                        <p className="infoText">&quot;What is the significance of the Miranda rights?&quot;</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <BoltIcon className="h-8 w-8" />
                        <h2>Capabilities</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Provide detailed legal analysis&quot;</p>
                        <p className="infoText">&quot;Summarize landmark Supreme Court cases&quot;</p>
                        <p className="infoText">&quot;Assist with legal research and citations&quot;</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <SunIcon className="h-8 w-8" />
                        <h2>Special Features</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Advanced natural language understanding tailored for legal texts&quot;</p>
                        <p className="infoText">&quot;Access to a vast database of legal precedents and statutes&quot;</p>
                        <p className="infoText">&quot;Interactive tools for creating legal documents&quot;</p>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(ChatPage), { ssr: false });