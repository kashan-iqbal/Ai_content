"use client";
import React, { useState } from "react";
import { TEMLATE } from "../../_components/TemplatesContent";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface PORPS {
  Template: TEMLATE | undefined;
  formData: (data: { [key: string]: string | number }) => void;
  loading: boolean;
}

const FormSections = ({ Template, formData, loading }: PORPS) => {
  const [inputVal, setValu] = useState<{ [key: string]: string | number }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValu({ ...inputVal, [name]: value });
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formData(inputVal);
    onSubmitInputNull();
  };

  const onSubmitInputNull = () => {
    setTimeout(() => {
      setValu({});
      console.log(`internet of things`);
    }, 1000);
  };

  const btn = loading ? <Loader /> : "Generate Content";
  return (
    <div className="p-5 shadow-md border rounded-lg ">
      <Image src={String(Template?.icon)} alt="logo" width={70} height={70} />
      <h2 className="font-bold text-2xl mb-2 text-purple-500">
        {Template?.name}
      </h2>
      <p className="text-gray-500 text-sm">{Template?.desc}</p>
      <form className="mt-6" onSubmit={HandleSubmit}>
        {Template?.form.map((item: any, i: number) => (
          <div key={i} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item?.label}</label>
            {item.field == "input" ? (
              <Input
                required
                type="text"
                name={item.name}
                onChange={handleChange}
              />
            ) : item.field == "textarea" ? (
              <Textarea required name={item.name} onChange={handleChange} />
            ) : null}
          </div>
        ))}
        <Button
          type="submit"
          className="w-full py-6 bg-purple-500 hover:bg-purple-700 rounded  "
          disabled={loading}
        >
          {btn}
        </Button>
      </form>
    </div>
  );
};

export default FormSections;
