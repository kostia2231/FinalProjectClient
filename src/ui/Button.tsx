import clsx from "clsx";
import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "profile" | "icon" | "link";

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
        "bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white rounded-xl p-2 font-medium w-full",
      profile:
        "bg-gray-100 text-black py-2 px-9 rounded-lg text-sm font-semibold",
      link: "h-fit w-fit h-fit font-medium text-blue-400 hover:text-blue-300 ",
      icon: "h-10 w-10 bg-green-500",
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
