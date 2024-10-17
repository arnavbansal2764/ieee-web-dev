'use client';
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, FileText, Home, MessageSquare, PlusCircle, Search, Settings, Upload, User } from "lucide-react"
import Navbar from "./main/navbar"
import { useRouter } from "next/navigation"
import useCreateChat from "@/hooks/useCreateChat"
import { useSession } from "@clerk/nextjs";
import axios from "axios";
type PDF = {
  _id: string;
  name: string;
  uploadDate: string;
};

export default function Component() {
  const router = useRouter();
  const createChat = useCreateChat();
  const createNew = () => {
      router.push('/chat');
      createChat.onOpen();
  }
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSession();
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        if (session?.user) {
          const response = await axios.get('/api/pdfs');
          setPdfs(response.data);
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, [session]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Navbar/>
      {/* Main Content */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-100 animate-fade-in">
            Welcome to Your Dashboard
          </h1>

          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="documents" className="data-[state=active]:bg-gray-700">Documents</TabsTrigger>
              <TabsTrigger value="queries" className="data-[state=active]:bg-gray-700">Queries</TabsTrigger>
              <TabsTrigger value="faqs" className="data-[state=active]:bg-gray-700">FAQs</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-gray-700">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <div className="flex justify-between items-center animate-slide-in">
                <h2 className="text-2xl font-semibold text-gray-100">Your Documents</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>createNew()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New PDF
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-gray-300">File Name</TableHead>
                    <TableHead className="text-gray-300">Upload Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-gray-800">
                    <TableCell className="text-gray-300">example1.pdf</TableCell>
                    <TableCell className="text-gray-300">2023-05-15</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-gray-300">example2.pdf</TableCell>
                    <TableCell className="text-gray-300">2023-05-10</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="queries" className="space-y-4">
              <div className="flex justify-between items-center animate-slide-in">
                <h2 className="text-2xl font-semibold text-gray-100">Query History</h2>
                <div className="flex items-center">
                  <Input placeholder="Search queries..." className="mr-2 bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-400" />
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-gray-300">Query</TableHead>
                    <TableHead className="text-gray-300">Timestamp</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-gray-800">
                    <TableCell className="text-gray-300">What is the main topic of Chapter 1?</TableCell>
                    <TableCell className="text-gray-300">2023-05-15 14:30</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">View Response</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-gray-300">Who is the author of the document?</TableCell>
                    <TableCell className="text-gray-300">2023-05-14 10:15</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-gray-800">View Response</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100 animate-fade-in">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-gray-800">
                  <AccordionTrigger className="text-gray-100 hover:text-blue-400">How do I upload a PDF?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    To upload a PDF, click on the "Upload PDF" button in the navigation menu or on your dashboard. Then, select the PDF file from your device and click "Upload".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-gray-800">
                  <AccordionTrigger className="text-gray-100 hover:text-blue-400">How can I delete a document?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    To delete a document, go to the "Documents" tab on your dashboard. Find the document you want to delete and click the "Delete" button next to it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-gray-800">
                  <AccordionTrigger className="text-gray-100 hover:text-blue-400">What types of questions can I ask about my PDFs?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can ask any questions related to the content of your uploaded PDFs. The AI will analyze the documents and provide answers based on the information contained within them.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-100 animate-fade-in">
                User Profile
              </h2>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">Your Information</CardTitle>
                  <CardDescription className="text-gray-400">Manage your account details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium leading-none text-gray-300">Full Name</label>
                    <Input id="name" defaultValue="John Doe" className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium leading-none text-gray-300">Email</label>
                    <Input id="email" defaultValue="john@example.com" className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Interactive Features */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 animate-fade-in">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Query Interface</CardTitle>
                <CardDescription className="text-gray-400">Ask questions about your PDFs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input placeholder="Enter your question..." className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400" />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Suggested Questions</CardTitle>
                <CardDescription className="text-gray-400">Based on your uploaded PDFs</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="text-blue-400 hover:text-blue-300">What is the main argument in Chapter 2?</Button>
                    </li>
                    <li>
                      <Button variant="link" className="text-blue-400 hover:text-blue-300">Who are the key figures mentioned in the  document?</Button>
                    </li>
                    <li>
                      <Button variant="link" className="text-blue-400 hover:text-blue-300">What are the conclusions drawn in the final chapter?</Button>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 animate-fade-in"
      >
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 sm:flex-row sm:gap-2">
            <p className="text-center text-sm leading-loose text-gray-400 sm:text-left">
              © 2023 Intelligent PDF Querying System. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4">
            <a className="text-sm font-medium text-gray-400 hover:text-blue-400 hover:underline" href="#">
              Terms of Service
            </a>
            <a className="text-sm font-medium text-gray-400 hover:text-blue-400 hover:underline" href="#">
              Privacy Policy
            </a>
            <a className="text-sm font-medium text-gray-400 hover:text-blue-400 hover:underline" href="#">
              Contact Us
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}