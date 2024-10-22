import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutPut } from "@/utils/AiSchema";
import { db } from "@/utils/dbConnect";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

function UseTrack() {
  const [credit, setCredit] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    user && getData();
  }, [user]);
  const getData = async () => {
    const result = await db
      .select()
      .from(AiOutPut)
      .where(eq(AiOutPut.createdBy, user?.primaryEmailAddress?.emailAddress));
    getCreditScore(result);
  };

  const getCreditScore = (res) => {
    let score = 0;

    res.length > 0 &&
      res.forEach((element) => {
        score = score + element?.aiResponce.length;
      });
    setCredit(score);
  };

  const usage = (credit / 10000) * 100;

  return (
    <>
      <div className="m-5">
        <div className="text-white p-3 bg-purple-500 rounded">
          <h1>Credits Score</h1>
          <div className="h-2 bg-[#9981f9] w-full rounded-full">
            <div
              className="h-2 bg-[#ffffff] rounded-full"
              style={{ width: `${usage}%` }}
            ></div>
          </div>
          <p className="h-3">{credit}/ 10000 Credit Used</p>
        </div>
        <Button className="bg-purple-500 rounded hover:bg-purple-600 text-white w-full my-3 ">
          UpGrade
        </Button>
      </div>
    </>
  );
}

export default UseTrack;
