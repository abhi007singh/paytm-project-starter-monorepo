"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendCard = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"e.g. 98XXX009XX"}
              label="Number"
              onChange={(value) => {
                setContactNumber(value);
              }}
            />
            <TextInput
              placeholder={"e.g. 1000"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  const { message } = await p2pTransfer(
                    contactNumber,
                    Number(amount) * 100
                  );
                  alert(message);
                  setContactNumber("");
                  setAmount("");
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};
