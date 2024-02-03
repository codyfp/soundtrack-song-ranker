import { useState } from "react";

type CellProps = {
  content?: string;
  className?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type RowProps = {
  rank?: number;
  name?: string;
  song?: string;
  editable?: boolean;
  updateRow?: (newRow: RowProps) => void;
  removeRow?: () => void;
};
type DropTableProps = {
  mainRows: RowProps[];
  rows: RowProps[];
  setRows: (newRows: RowProps[]) => void;
};

const DropTable = ({ mainRows, rows = [], setRows }: DropTableProps) => {
  const [title, setTitle] = useState("Rank da Soundtracks");
  return (
    <div>
      <div className="overflow-hidden rounded-m">
        <div>
          <input
            className="p-2 underline bg-black border-none focus:outline-none text-slate-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {mainRows.map((row, index) => {
          return <Row key={index} rank={index + 1} {...row} />;
        })}
      </div>
    </div>
  );
};

const Row = ({ rank }: RowProps) => {
  return (
    <div className="flex">
      <Cell content={rank?.toString()} className="w-[42px]" />
      <Cell className="w-[200px]" />
    </div>
  );
};

const Cell = ({ content = "", className }: CellProps) => {
  return <div className={`${className} p-2 border border-slate-200`}> {content}</div>;
};

export default DropTable;
