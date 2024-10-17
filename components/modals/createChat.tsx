"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useCreateChat from "@/hooks/useCreateChat";
import Modal from "./modal";
import { UploadButton } from "@/lib/uploadThing/uploadThing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Heading from "./ModalInputs/Heading";
import Input from "./Input";

interface FormData {
  pdf: File | null;
  chatTitle: string;
}

const CreateChatModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // This helps in setting values manually
    watch, // Watching field changes
  } = useForm<FormData>({
    defaultValues: {
      chatTitle: "",
      pdf: null,
    },
  });

  const newChat = useCreateChat();
  const [isLoading, setIsLoading] = useState(false);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { userId } = useAuth();
  const router = useRouter();

  const onBack = () => {
    newChat.onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!pdfUrl) {
      toast.error("Please upload a PDF before creating the chat.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/createChat", {
        pdfUrl: pdfUrl,
        name: data.chatTitle, // Using data from react-hook-form
      });

      const newPdf = response.data;
      toast.success("PDF uploaded and chat created!");
      router.refresh();
      reset(); // Reset the form after successful submission
      newChat.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error creating chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    return "Create";
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return "Back";
  }, []);

  const chatTitle = watch("chatTitle"); // Watching the chatTitle input field

  let bodyContent = (
    <div>
      <div className="file_upload p-5 border-4 border-dotted border-gray-600 rounded-lg bg-gray-800 text-white mb-10">
        <svg
          className="text-indigo-400 w-16 h-16 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="input_field flex flex-col items-center">
          <label>
            <UploadButton
              endpoint="pdfFile"
              onUploadBegin={() => {
                setIsLoading(true);
              }}
              onClientUploadComplete={(res) => {
                setPdfUrl(res[0].url);
                setPdfName(res[0].name);
                console.log("Files: ", res);
                setIsLoading(false);
              }}
              onUploadError={(error: Error) => {
                setIsLoading(false);
                alert(`ERROR! ${error.message}`);
              }}
            />
            {!pdfName ? (
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
                    <div className="ml-2 text-indigo-400">Uploading...</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="text bg-indigo-600 text-white border border-gray-500 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500">
                Selected File: <span className="text-white">{pdfName}</span>
              </div>
            )}
          </label>
        </div>
      </div>

      <Heading title="Chat Title" />
      <Input
        id="chatTitle"
        label="Your chat title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>

  );

  return (
    <Modal
      isOpen={newChat.isOpen}
      onClose={newChat.onClose}
      onSubmit={handleSubmit(onSubmit)} // Handle form submission
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      title="Welcome! Create your new chat"
      body={bodyContent}
    />
  );
};

export default CreateChatModal;
