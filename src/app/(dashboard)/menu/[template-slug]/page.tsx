"use client";
import React, { useState } from "react";
import FormSections from "../_component/FormSections";
import OutPutSections from "../_component/OutPutSections";
import { ListTemplate } from "@/app/(data)/Template";
import { TEMLATE } from "../../_components/TemplatesContent";
import { chatSession } from "@/utils/AiApi";
import { useUser } from "@clerk/nextjs";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const [loading, setLoading] = useState(false);
  const [aiResponce, setAiresponce] = useState("");
  const { user } = useUser();
  const selectedTemplate: TEMLATE | undefined = ListTemplate.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const formData = async (data: { [key: string]: string | number }) => {
    setLoading(true);
    const input = JSON.stringify(data);
    const prompt = input + "," + selectedTemplate?.aiPrompt;

    // Get AI response
    const result = await chatSession.sendMessage(prompt);
    const aiOutput = await result.response.text();
    console.log(aiOutput);
    setAiresponce(aiOutput);

    // Call API route to save data
    const responce = await fetch("/api/save-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
        aiOutput,
        templateSlug: selectedTemplate?.slug,
        user,
      }),
    });
    console.log(responce);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 ">
      <FormSections
        loading={loading}
        formData={formData}
        Template={selectedTemplate}
      />
      <div className="col-span-2">
        <OutPutSections aiResponce={aiResponce} />
      </div>
    </div>
  );
};

export default CreateNewContent;
