import { useState } from "react";
import { CellProps, DropCellProps } from "@/types";

const Cell = ({ content = "", className, editable = false, onChange }: CellProps) => {
  if (editable) {
    return (
      <input
        className={`${className} px-2 py-1 border border-slate-200 bg-gray-900 text-slate-200 focus:outline-none`}
        value={content}
        onChange={onChange}
      />
    );
  }
  return <div className={`${className} px-2 py-1 border border-slate-200`}>{content}</div>;
};

const DropCell = ({ className, draggedItem }: DropCellProps) => {
  const [cellContent, setCellContent] = useState<string>("");
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setCellContent(draggedItem);
  };
  return (
    <div onDrop={onDrop} onDragOver={onDragOver} className={`${className} px-2 py-1 border border-slate-200`}>
      {cellContent}
    </div>
  );
};

export { Cell, DropCell };
