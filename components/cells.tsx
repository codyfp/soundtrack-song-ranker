import { useState } from "react";
import { CellProps, DropCellProps } from "@/types";

const Cell = ({ content = "", className, editable = false, onChange }: CellProps) => {
  if (editable) {
    return (
      <input
        className={`${className} px-2 py-1 border border-slate-200 bg-gray-900 text-slate-200 focus:outline-none`}
        value={content as string}
        onChange={onChange}
      />
    );
  }
  return <div className={`${className} px-2 py-1 border border-slate-200`}>{content}</div>;
};

export { Cell };
