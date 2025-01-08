import clsx from "clsx";
import {
  forwardRef,
  ChangeEvent,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
  Ref,
} from "react";

type InputVariant = "primary" | "secondary" | "error";

interface BaseProps {
  className?: string;
  variant?: InputVariant;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type InputSpecificProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "email" | "password";
};

type TextareaSpecificProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  type?: "textarea";
};

type InputProps = BaseProps & (InputSpecificProps | TextareaSpecificProps);

const Input = forwardRef<HTMLTextAreaElement | HTMLInputElement, InputProps>(
  ({ variant = "primary", type = "text", onChange, onBlur, ...props }, ref) => {
    const styles = {
      primary:
        "placeholder:font-light placeholder:text-sm border rounded py-4 px-3 bg-gray-50",
      secondary: "border-blue-300",
      error:
        "placeholder:font-light placeholder:text-sm border rounded py-4 px-3 bg-red-50 border-red-100",
    };

    const inputClass = clsx(
      styles[variant],
      "px-2 py-3 rounded border placeholder:text-xs w-full text-xs",
    );

    if (type === "textarea") {
      return (
        <textarea
          ref={ref as Ref<HTMLTextAreaElement>}
          className={inputClass}
          onChange={onChange}
          onBlur={onBlur}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <input
        ref={ref as Ref<HTMLInputElement>}
        className={inputClass}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
