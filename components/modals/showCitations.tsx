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
import useCitations from "@/hooks/useCitations";

const ShowCitations = () => {
  const citation = useCitations();

  const onBack = () => {
    citation.onClose();
  };
  const actionLabel = useMemo(() => {
    return "Close";
  }, []);

  let bodyContent = (
    <div>
      <Heading title="Citations here" />
    </div>
  );

  return (
    <Modal
      isOpen={citation.isOpen}
      onClose={citation.onClose}
      onSubmit={() => {}}
      actionLabel={actionLabel}
      secondaryAction={onBack}
      title="Citations for this response"
      body={bodyContent}
    />
  );
};

export default ShowCitations;
