
export type CellProps = {
  content?: string;
  className?: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RowProps = {
  rank?: number;
  name?: string;
  song?: string;
  editable?: boolean;
  updateRow?: (newRow: RowProps) => void;
  removeRow?: () => void;
  onDrag?: (e: React.DragEvent<HTMLDivElement>, name: string) => void;
};

export type TableProps = {
  header: RowProps;
  rows: RowProps[];
  setRows: (newRows: RowProps[]) => void,
  onDrag: (e: React.DragEvent<HTMLDivElement>, name: string) => void,
};

export type DropTableProps = {
  draggedItem: string;
  mainRows: RowProps[];
  updateTable: (newRows: RowProps[]) => void;
};

export type DropRowProps = {
  name?: string;
  rank?: number;
  draggedItem: string;
};

export type DropCellProps = {
  className: string;
  draggedItem: string;
};