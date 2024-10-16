
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
            {/* <Image src='/bannerfinal.png' alt="logo" width={500} height={500} className="" /> */}
            <div className="flex space-x-3 text-center">
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <AcademicCapIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Upload a PDF to analyze job descriptions&quot;</p>
                        <p className="infoText">&quot;Generate a personalized chat for resume analysis&quot;</p>
                        <p className="infoText">&quot;Get AI-driven insights on your uploaded files&quot;</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <BoltIcon className="h-8 w-8" />
                        <h2>Capabilities</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Upload and analyze job descriptions from PDFs&quot;</p>
                        <p className="infoText">&quot;Generate detailed summaries and feedback&quot;</p>
                        <p className="infoText">&quot;Create interactive chats for resume improvement&quot;</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        <SunIcon className="h-8 w-8" />
                        <h2>Special Features</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Advanced AI tailored for analyzing resumes and job descriptions&quot;</p>
                        <p className="infoText">&quot;Instant feedback on resumes with scoring based on skills, experience, and more&quot;</p>
                        <p className="infoText">&quot;Interactive chat tool for career guidance and resume tips&quot;</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default dynamic(() => Promise.resolve(ChatPage), { ssr: false });