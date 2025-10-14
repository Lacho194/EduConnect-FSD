import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const courses = await prisma.course.findMany({
    include: { teacher: true },
  });
  res.json(courses);
}
