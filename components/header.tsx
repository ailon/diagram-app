import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import Image from "next/image";
import { GitHubLogoIcon, QuestionMarkIcon } from "@radix-ui/react-icons";

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
          <a href="https://markerjs.com/products/diagram/" title="MJS Diagram">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <Image
                src={"./markerjs-logo-m.svg"}
                alt="MJS Diagram"
                width="24"
                height="24"
                className="h-4 w-4"
              />
            </Button>
          </a>

          <a href="https://github.com/ailon/diagram-app" title="MJS Diagram">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <GitHubLogoIcon className="h-4 w-4 text-black" />
            </Button>
          </a>
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
