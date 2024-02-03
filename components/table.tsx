import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

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
type TableProps = { header: RowProps; rows: RowProps[]; setRows: (newRows: RowProps[]) => void };

const Table = ({ header, rows, setRows }: TableProps) => {
  return (
    <div>
      <div className="overflow-hidden rounded-m">
        <Row {...header} />
        {rows.map((row, index) => {
          const updateRow = (newRow: RowProps) => {
            const newRows = [...rows];
            newRows[index] = newRow;
            setRows(newRows);
          };
          const removeRow = () => {
            const newRows = [...rows];
            newRows.splice(index, 1);
            setRows(newRows);
          };
          return (
            <Row key={index} rank={index + 1} editable={true} updateRow={updateRow} removeRow={removeRow} {...row} />
          );
        })}
      </div>
      <div className="flex justify-end p-2">
        <button className="flex items-center p-2 rounded-md text-slate-200" onClick={() => setRows([...rows, {}])}>
          <PlusCircleIcon className="w-6 h-6" />
          <span className="ml-2">Add Row</span>
        </button>
      </div>
    </div>
  );
};

const Row = ({ rank, name, song, editable = false, updateRow, removeRow }: RowProps) => {
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRow?.({ rank, name: e.target.value, song });
  };
  const updateSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRow?.({ rank, name, song: e.target.value });
  };

  return (
    <div className="flex" draggable>
      <Cell content={rank?.toString()} className="w-[42px]" />
      <Cell content={name} onChange={updateName} editable={editable} className="min-w-[250px]" />
      <Cell content={song} onChange={updateSong} editable={editable} className="min-w-[250px]" />
      {rank && (
        <div className="flex justify-end p-2">
          <button
            className="flex items-center p-2 rounded-md opacity-20 hover:opacity-100 text-slate-200"
            onClick={removeRow}
          >
            <MinusCircleIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

const Cell = ({ content = "", className, editable = false, onChange }: CellProps) => {
  if (editable) {
    return (
      <input
        className={`${className} p-2 border border-slate-200 bg-gray-900 text-slate-200`}
        value={content}
        onChange={onChange}
      />
    );
  }
  return <div className={`${className} p-2 border border-slate-200`}> {content}</div>;
};

export default Table;
