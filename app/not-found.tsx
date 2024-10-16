'use client';
export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-screen bg-[#030014] overflow-y-scroll overflow-x-hidden">
            <div className="text-center">
                <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
                <p className="mb-4 text-lg text-white">Oops! Looks like you&apos;re lost.</p>
                <div className="animate-bounce">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </div>
                <p className="mt-4 text-white">Let &apos;s get you back <a href="/" className="text-blue-500">home</a>.</p>
            </div>
        </div>
    )
}