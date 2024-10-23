import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  aiResponce: string;
}

const OutPutSections = ({ aiResponce }: PROPS) => {
  const handleCopy = () => {
    navigator?.clipboard.writeText(aiResponce && aiResponce);
  };
  return (
    <div>
      <div className="flex px-2 justify-between items-center bg-slate-200">
        <h3 className="text-xl font-bold">Your Result</h3>
        <Button
          variant={"secondary"}
          className="bg-purple-500 rounded hover:bg-purple-400"
          onClick={handleCopy}
        >
          <Copy /> Copy
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Textarea
          className="outline-none"
          value={aiResponce}
          rows={Math.max(1, aiResponce.split("\n").length)}
          readOnly
        />
      </div>
    </div>
  );
};

export default OutPutSections;
