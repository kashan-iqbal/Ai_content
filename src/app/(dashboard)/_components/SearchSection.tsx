import { Search } from "lucide-react";
import React from "react";

interface SearchSectionProps {
  onChangeHandleInput: (inputval: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onChangeHandleInput,
}) => {
  return (
    <div className="p-2 md:p-10 bg-gradient-to-br from-purple-500  via-purple-700 to-blue-600 flex-col   text-white">
      <h1 className="text-3xl font-bold text-center">Browse All Template</h1>
      <p className="text-center">What would like to create toDay</p>
      <div className="flex w-full justify-center">
        <div className="flex gap-2 items-center p-2 border rounded bg-white mt-4  w-[80%]  md:w-[50%]">
          <Search className="text-purple-500" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-black bg-transparent w-full"
            onChange={(e) => onChangeHandleInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
