import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2PTransfer } from "../../../components/P2PTransfer";

async function getP2PTransfer() {
  const session = await getServerSession(authOptions);
  const p2p = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
    include: {
      toUser: true,
      fromUser: true,
    },
    take: 5,
  });

  return p2p.map((p) => ({
    amount: p.amount,
    timestamp: p.timestamp,
    fromUser: p.fromUser,
    toUser: p.toUser,
  }));
}

export default async function () {
  const transfers = await getP2PTransfer();

  return (
    <div className="w-full pt-24 grid-cols-12">
      <div className="col-span-3">
        <SendCard />
      </div>
      <div className="pt-12 col-span-9">
        <P2PTransfer transfers={transfers} />
      </div>
    </div>
  );
}
