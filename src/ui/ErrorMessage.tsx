import { FC, ReactNode } from "react";

type ErrorMessageP = {
  children: ReactNode;
};

const ErrorMessage: FC<ErrorMessageP> = ({ children }) => {
  return (
    <>
      <p className="text-xs text-red-300">{children}</p>
    </>
  );
};

export default ErrorMessage;
