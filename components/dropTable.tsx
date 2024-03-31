import { useState } from "react";
import { Cell } from "./cells";
import { DropRowProps, DropTableProps } from "@/types";

const DropTable = (props: DropTableProps) => {
  const { selectionTableRows, draggedItem, title, setTitle, mainRows, setRow } = props;
  return (
    <div className="overflow-hidden rounded-m">
      <div className="flex flex-row gap-2">
        <input
          className="p-2 underline bg-black border-none focus:outline-none text-slate-200"
          value={title}
          defaultValue={"Rank da tables"}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {mainRows.map((_, index) => {
        const cellContent = selectionTableRows[index + 1] ?? "";
        const setCellContent = (newContent: string) => {
          setRow({ rank: index + 1, value: newContent });
        };
        return (
          <Row
            key={index}
            rank={index + 1}
            draggedItem={draggedItem}
            cellContent={cellContent}
            setCellContent={setCellContent}
          />
        );
      })}
    </div>
  );
};

const Row = ({ rank, draggedItem, cellContent, setCellContent }: DropRowProps) => {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [hasDropped, setHasBeenDropped] = useState<boolean>(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setCellContent(draggedItem);
    setIsDraggedOver(false);
    if (!draggedItem) return;
    setHasBeenDropped(true);
    setTimeout(() => {
      setHasBeenDropped(false);
    }, 1000);
  };
  return (
    <div
      className={`flex border-2 border-slate-200 ${isDraggedOver ? "bg-slate-800 animate-bounce" : ""} ${
        hasDropped ? "highlight animate-spin" : ""
      } ${rank == 1 ? "border-t-2" : "border-t"}`}
    >
      <Cell content={rank?.toString()} className="w-[42px] border-none" />
      <div
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        className={`w-[200px] px-2 py-1 border-l-2 border-slate-200`}
      >
        {cellContent}
      </div>
    </div>
  );
};

export default DropTable;
