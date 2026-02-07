import { CellProps } from "@/types";

const Cell = ({ content = "", className, editable = false, onChange }: CellProps) => {
  if (editable) {
    return (
      <input
        className={`${className} px-2 py-1 border border-textCol focus:outline-none bg-inherit`}
        value={content as string}
        onChange={onChange}
      />
    );
  }
  return <div className={`${className} px-2 py-1 border border-textCol`}>{content}</div>;
};

export { Cell };
