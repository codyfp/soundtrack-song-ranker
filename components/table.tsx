import { PlusCircleIcon, MinusCircleIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { Cell } from "./cells";
import axios from "axios";
import { TableProps, RowProps } from "@/types";

const Table = ({ header, rows, setRows, onDrag }: TableProps) => {
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
            <Row
              key={index}
              rank={index + 1}
              editable={true}
              updateRow={updateRow}
              removeRow={removeRow}
              onDrag={onDrag}
              {...row}
            />
          );
        })}
      </div>
      <div className="flex justify-end">
        <button className="flex items-center p-2 rounded-md text-slate-200" onClick={() => setRows([...rows, {}])}>
          <PlusCircleIcon className="w-6 h-6" />
          <span className="ml-2">Add Row</span>
        </button>
      </div>
    </div>
  );
};

const Row = ({ rank, name = "", song, editable = false, updateRow, removeRow, onDrag = () => {} }: RowProps) => {
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRow?.({ rank, name: e.target.value, song });
  };
  const updateSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRow?.({ rank, name, song: e.target.value });
  };

  return (
    <div className="flex" draggable onDrag={(e) => onDrag(e, name)}>
      <Cell content={rank?.toString()} className="w-[42px]" />
      <span className="relative">
        <Cell content={name} onChange={updateName} editable={editable} className="min-w-[250px]" />
        {rank && (
          <span className="absolute right-0 top-[4.5px] text-slate-200">
            <button className="flex items-center px-2 rounded-md opacity-20 hover:opacity-100">
              <MagnifyingGlassCircleIcon className="w-6 h-6" />
            </button>
          </span>
        )}
      </span>
      <Cell content={song} onChange={updateSong} editable={editable} className="min-w-[250px]" />
      {rank && (
        <div className="flex justify-end">
          <button
            className="flex items-center px-2 rounded-md opacity-20 hover:opacity-100 text-slate-200"
            onClick={removeRow}
          >
            <MinusCircleIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
