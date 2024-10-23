import { ListTemplate } from "@/app/(data)/Template";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

export interface TEMLATE {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface TemplatesContentProps {
  handleSearch: string;
}

const TemplatesContent: React.FC<TemplatesContentProps> = ({
  handleSearch,
}) => {
  const [showResult, setShowResult] = useState(ListTemplate);

  useEffect(() => {
    if (handleSearch) {
      setShowResult(
        showResult.filter((r) =>
          r.name.toLowerCase().includes(handleSearch.toLocaleLowerCase())
        )
      );
    } else {
      setShowResult(ListTemplate);
    }
  }, [handleSearch, showResult]);

  return (
    <>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 p-10">
        {showResult.map((t: TEMLATE, i: number) => (
          <TemplateCard {...t} key={i} />
        ))}
      </div>
      {showResult.length === 0 && (
        <h1 className="text-center">No Result Found</h1>
      )}
    </>
  );
};

export default TemplatesContent;
