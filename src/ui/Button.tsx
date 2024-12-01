import clsx from "clsx";
import React, { FC } from "react";

type ButtonVariant = "primary" | "secondary" | "icon";
type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
}

const Button: FC<ButtonProps> = (
  { type, variant, children, onClick, icon },
  ref
) => {
  const styles = {
    primary: "bg-blue-500 text-white rounded-md p-2",
    secondary: "bg-transparent text-black p-2",
    icon: "h-10 w-10 bg-green-500",
  };

  const buttonClass = clsx(styles[variant]);

  return (
    <button ref={ref} type={type} className={buttonClass} onClick={onClick}>
      {icon ? <span>{icon}</span> : children}
    </button>
  );
};

export default Button;
