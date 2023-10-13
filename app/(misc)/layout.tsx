import Header from "@/components/header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="flex grow overflow-hidden md:m-4 p-2 md:p-6 bg-white md:rounded-lg max-w-5xl self-center">
        {children}
      </div>
    </>
  );
};

export default layout;
