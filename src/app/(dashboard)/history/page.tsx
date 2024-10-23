"use client";
import { ListTemplate } from "@/app/(data)/Template";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AiOutPut } from "@/utils/AiSchema";
import { db } from "@/utils/dbConnect";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TEMLATE } from "../_components/TemplatesContent";

interface RESPONCE {
  id: number;
  formData: string;
  aiResponce: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

const History = () => {
  const [data, setData] = useState<RESPONCE[]>([]);
  const { user, isLoaded } = useUser(); // Ensure `isLoaded` is available

  useEffect(() => {
    const getData = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;

        // Check if the email is available before making the query
        if (!email) {
          console.error("Email address is not defined.");
          return;
        }

        // Fetch data where `createdBy` matches the user's email address
        const fetchData = await db
          .select()
          .from(AiOutPut)
          .where(
            eq(AiOutPut.createdBy, email) // Ensure email is correctly passed as a string
          )
          .orderBy(AiOutPut.createdAt); // Sort by 'createdAt' in descending order

        setData(fetchData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only when `isLoaded` is true and the user has an email address
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getData();
    }
  }, [isLoaded, user]);

  return (
    <div>
      <h1 className="text-center text-6xl font-extrabold mb-4 text-purple-500">
        History
      </h1>
      <Table>
        <TableCaption>A list of history that you generated.</TableCaption>
        <TableHeader className="bg-purple-300 rounded">
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="hidden md:block">Date</TableHead>
            <TableHead>Words</TableHead>
            <TableHead className="text-right">Copy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((item, index) => {
              // Find the template by slug
              const findTemplate = ListTemplate.find(
                (template) => template.slug == item?.templateSlug
              );
              const handleCopy = () => {
                navigator.clipboard.writeText(
                  item?.aiResponce || "unable to copy"
                );
              };

              return (
                <TableRow key={index}>
                  <TableCell className=" flex items-center">
                    <Image
                      src={String(findTemplate?.icon)}
                      width={50}
                      height={50}
                      alt="image"
                    />
                    <p className="hidden md:block">{findTemplate?.name}</p>
                  </TableCell>
                  <TableCell>{item?.aiResponce?.substring(0, 40)}</TableCell>
                  <TableCell className="hidden md:block">
                    {item?.createdAt}
                  </TableCell>
                  <TableCell>{item?.aiResponce?.length}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      className="bg-purple-500 rounded"
                      onClick={handleCopy}
                    >
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;
