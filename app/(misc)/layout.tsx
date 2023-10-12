import Header from "@/components/header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default layout;
