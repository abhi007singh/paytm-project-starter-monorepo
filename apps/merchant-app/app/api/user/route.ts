import { NextResponse } from "next/server";
import prisma from "../../../../../packages/db/src";

// const client = new prisma();

export const GET = async () => {
  await prisma.merchant.create({
    data: {
      email: `as${new Date()}`,
      name: "adsads",
      auth_type: "Google",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
