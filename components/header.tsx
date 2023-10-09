import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div className="w-screen flex p-2">
        <p className="flex-none text-2xl content-center ml-4 text-purple-800">Diagrams</p>
        <div className="flex flex-1 justify-end">
          <Button variant={"link"}>?</Button>
        </div>
      </div>
      <Separator decorative={true} />
    </>
  );
};

export default Header;
