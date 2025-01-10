import { Link } from "@tanstack/react-router";
import { FC, ReactNode } from "react";

type CustomLinkT = {
  children: ReactNode;
  path: string;
};

const CustomLink: FC<CustomLinkT> = ({ children, path }) => {
  return (
    <>
      <Link to={path}>{children}</Link>
    </>
  );
};
export default CustomLink;
