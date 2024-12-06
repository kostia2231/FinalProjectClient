import clsx from "clsx";
import { forwardRef, ChangeEvent } from "react";

type InputVariant = "primary" | "secondary" | "error";
type InputType = "text" | "textarea" | "number" | "password";

interface InputProps {
  variant: InputVariant;
  type: InputType;
  value: string | number;
  placeholder?: string;
  style?: React.CSSProperties;
  name?: string;
  required?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      variant,
      type,
      value,
      onChange,
      onBlur,
      placeholder,
      style,
      name,
      required,
    },
    ref
  ) => {
    const styles = {
      primary: "",
      secondary: "",
      error: "border-red-300",
    };

    const inputClass = clsx(
      styles[variant],
      "px-2 py-3 rounded border placeholder:text-xs w-[100%] text-xs"
    );

    return type === "textarea" ? (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={inputClass}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    ) : (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={inputClass}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
        placeholder={placeholder}
        name={name}
        required={required}
        type={type}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
