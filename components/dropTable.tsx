import { useState } from "react";
import { Cell, DropCell } from "./cells";
import { DropRowProps, DropTableProps } from "@/types";

const DropTable = ({ mainRows = [], draggedItem, updateTable }: DropTableProps) => {
  const [title, setTitle] = useState("Rank da Soundtracks");
  return (
    <div>
      <div className="overflow-hidden rounded-m">
        <div className="flex flex-row gap-2">
          <input
            className="p-2 underline bg-black border-none focus:outline-none text-slate-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {mainRows.map((row, index) => {
          return <Row key={index} rank={index + 1} draggedItem={draggedItem} {...row} />;
        })}
      </div>
    </div>
  );
};

const Row = ({ rank, draggedItem }: DropRowProps) => {
  return (
    <div className="flex">
      <Cell content={rank?.toString()} className="w-[42px]" />
      <DropCell draggedItem={draggedItem} className="w-[200px]" />
    </div>
  );
};

export default DropTable;
