import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
