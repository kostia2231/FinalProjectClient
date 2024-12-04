import clsx from "clsx";
import React, { FC, forwardRef, ChangeEvent } from "react";

type InputVariant = "primary" | "secondary";
type InputType = "text" | "textarea" | "number";

interface InputProps {
  variant: InputVariant;
  type: InputType;
  value: string | number;
  placeholder?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Обработчик изменения для input и textarea
}

// forwardRef:
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ variant, type, value, onChange, placeholder, style, children }, ref) => {
    // Пример стилей для классов
    const styles = {
      primary: "primary-class",
      secondary: "secondary-class",
    };

    // Применяем классы стилей в зависимости от варианта
    const inputClass = clsx(styles[variant]);

    if (type === "textarea") {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={inputClass}
          value={value}
          onChange={onChange}
          style={style}
          placeholder={placeholder}
          required
        >
          {children}
        </textarea>
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={inputClass}
        value={value}
        onChange={onChange}
        style={style}
        placeholder={placeholder}
        required
      >
        {children}
      </input>
    );
  }
);

export default Input;
