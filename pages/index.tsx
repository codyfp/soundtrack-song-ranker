import React, { useState, useEffect } from "react";
import Head from "next/head";
import Table from "@/components/table";
import DropTable from "@/components/dropTable";
import { RowProps } from "@/types";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [mainTableRows, setMainTableRows] = useState<RowProps[]>([{}]);
  const [selectionTables, setSelectionTables] = useState<RowProps[][]>([[{}]]); //TODO use this for state management of multiple tables to allow saving
  const [draggedItem, setDraggedItem] = useState<string>("");

  if (typeof window !== "undefined") {
    window.onblur = () => {
      saveTables();
    };
  }

  const onDrag = (e: React.DragEvent<HTMLDivElement>, name: string) => {
    e.preventDefault();
    setDraggedItem(name);
  };

  const saveTables = () => {
    if (!!mainTableRows?.[0]?.name) {
      console.log("Saving tables...", mainTableRows);
      localStorage.setItem("mainTableRows", JSON.stringify(mainTableRows));
    }
  };
  const loadTables = () => {
    const mainTableRows = localStorage.getItem("mainTableRows");
    if (mainTableRows) {
      setMainTableRows(JSON.parse(mainTableRows));
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-10 pt-10">
      <Head>
        <title>Rank da Soundtracks aye</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table
        header={{ name: "Soundtrack", song: "Song" }}
        rows={mainTableRows}
        setRows={setMainTableRows}
        onDrag={onDrag}
      />
      <div className="flex gap-10">
        {selectionTables.map((table, index) => {
          const updateTable = (newTable: RowProps[]) => {
            const newTables = [...selectionTables];
            newTables[index] = newTable;
            setSelectionTables(newTables);
          };

          return <DropTable key={index} mainRows={mainTableRows} draggedItem={draggedItem} updateTable={updateTable} />;
        })}
        {selectionTables.length > 1 && (
          <button
            className="flex items-center p-1 border border-collapse rounded-full h-min w-min border-slate-200 text-slate-200 opacity-20 hover:opacity-100"
            onClick={() => {
              const newTables = [...selectionTables];
              newTables.splice(selectionTables.length - 1, 1);
              setSelectionTables(newTables);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      <footer className="flex gap-10 pb-6">
        <button
          className="px-4 py-2 border rounded-full hover:scale-105 drop-shadow-lg text-slate-600 border-slate-600"
          onClick={() => setSelectionTables([...selectionTables, [{}]])}
        >
          New Ranking Table
        </button>
        <button className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600" onClick={saveTables}>
          Save Tables
        </button>
        <button className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600" onClick={loadTables}>
          Load Tables
        </button>
      </footer>
    </main>
  );
}
