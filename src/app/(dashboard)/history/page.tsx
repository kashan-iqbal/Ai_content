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
import { eq } from "drizzle-orm";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const History = () => {
  const [data, setData] = useState([]);
  const { user, isLoaded } = useUser(); // Ensure `isLoaded` is available

  useEffect(() => {
    // Fetch data only when the `user` is loaded
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getData();
    }
  }, [isLoaded, user]);

  const getData = async () => {
    try {
      // Fetch data where `createdBy` matches the user's email address
      const fetchData = await db
        .select()
        .from(AiOutPut)
        .where(eq(AiOutPut.createdBy, user?.primaryEmailAddress?.emailAddress)); // Correct where clause with eq()

      setData(fetchData.reverse()); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                navigator.clipboard.writeText(item?.aiResponce);
              };

              return (
                <TableRow key={index}>
                  <TableCell className=" flex items-center">
                    <Image
                      src={findTemplate?.icon}
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
