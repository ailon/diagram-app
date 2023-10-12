import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div className="w-screen flex p-2 bg-gradient-to-br from-white to-violet-50 shadow">
        <Link
          href="/"
          className="flex-none text-2xl content-center ml-4 text-violet-800 hover:no-underline"
        >
          Diagrams
        </Link>
        <div className="flex flex-1 justify-end">
          <Link href="/about">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <QuestionMarkIcon />
            </Button>
          </Link>
        </div>
      </div>
      <Separator decorative={true} />
    </>
  );
};

export default Header;
