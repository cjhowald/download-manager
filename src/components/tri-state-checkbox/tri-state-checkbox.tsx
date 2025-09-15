import { useEffect, useRef, type InputHTMLAttributes } from "react";

export type CheckboxState = "selected" | "unselected" | "indeterminate";

export interface TriStateCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  state: CheckboxState;
}

export const TriStateCheckbox = (props: TriStateCheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { state } = props;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = state === "indeterminate";
    }
  }, [state]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={state === "selected" ? true : false}
      {...props}
    />
  );
};
