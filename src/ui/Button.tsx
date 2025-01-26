import clsx from "clsx";
import { forwardRef, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "profile"
  | "icon"
  | "link"
  | "edit"
  | "delete"
  | "profilePrimary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      children,
      onClick,
      icon,
      className,
      ...props
    },
    ref,
  ): JSX.Element => {
    const styles = {
      primary:
        "bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white rounded-xl p-2 font-medium w-full transition-colors",
      profile:
        "bg-gray-100 text-black py-2 px-9 rounded-lg text-sm font-semibold transition-colors",
      profilePrimary:
        "bg-blue-500 text-white py-2 px-9 rounded-lg text-sm font-semibold hover:bg-blue-300 transition-colors",
      link: "h-fit w-fit h-fit font-medium text-blue-400 hover:text-blue-300 transition-colors",
      edit: "w-[300px] p-4 border-t text-black hover:text-opacity-50 transition-colors",
      icon: "h-fit w-fit",
      delete:
        "bg-red-500 hover:bg-red-400 active:bg-red-300 text-white rounded-xl p-2 font-medium w-full transition-colors",
    };

    const buttonClass = clsx(styles[variant], className);

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClass}
        onClick={onClick}
        {...props}
      >
        {icon ? <span>{icon}</span> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
