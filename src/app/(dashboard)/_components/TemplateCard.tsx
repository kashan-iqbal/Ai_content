import React from "react";
import { TEMLATE } from "./TemplatesContent";
import Image from "next/image";
import Link from "next/link";

const TemplateCard = (item: TEMLATE) => {
  return (
    <Link href={`/menu/${item?.slug}`}>
      <div className="p-5 shadow-md rounded-lg border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all">
        <Image src={item.icon} alt="icon" height={100} width={100} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500  line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
