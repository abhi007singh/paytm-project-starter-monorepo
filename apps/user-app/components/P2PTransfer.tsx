import { User } from "@prisma/client";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const P2PTransfer = async ({
  transfers,
}: {
  transfers: {
    amount: number;
    timestamp: Date;
    fromUser: User;
    toUser: User;
  }[];
}) => {
  const session = await getServerSession(authOptions);

  if (!transfers.length) {
    return (
      <Card title="Recent Transfers">
        <div className="text-center pb-8 pt-8">No Recent Transaction</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transfers">
      <div className="pt-2">
        {transfers.map((t, index) => (
          <div className="flex justify-between" key={index}>
            <div>
              <div className="text-sm">
                {session?.user?.id === t.toUser.id
                  ? `Received from ${t.fromUser.name}`
                  : `Sent to ${t.toUser.name}`}
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div
              className={`flex flex-col justify-center ${session?.user?.id === t.toUser.id ? "text-green-700" : "text-red-600"}`}
            >
              {session?.user?.id === t.toUser.id ? "+" : "-"} Rs{" "}
              {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
