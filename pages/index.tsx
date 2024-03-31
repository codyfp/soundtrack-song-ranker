import React, { useState } from "react";
import Head from "next/head";
import Table from "@/components/table";
import DropTable from "@/components/dropTable";
import { RowProps, SelectionTable } from "@/types";
import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import createRandomString from "@/utils/createRandomString";

export default function Home() {
  const [mainTableRows, setMainTableRows] = useState<RowProps[]>([{}]);
  const [selectionTables, setSelectionTables] = useState<SelectionTable[]>([{ id: createRandomString(), rows: {} }]); //TODO use this for state management of multiple tables to allow saving
  const [draggedItem, setDraggedItem] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

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
      localStorage.setItem("mainTableRows", JSON.stringify(mainTableRows));
      localStorage.setItem("selectionTables", JSON.stringify(selectionTables));
    }
  };
  const loadTables = () => {
    const mainTableRows = localStorage.getItem("mainTableRows");
    if (mainTableRows) {
      setMainTableRows(JSON.parse(mainTableRows));
    }
    const selectionTables = localStorage.getItem("selectionTables");
    if (selectionTables) {
      setSelectionTables(JSON.parse(selectionTables));
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-10 pt-10">
      <Head>
        <title>Rank da Soundtracks aye</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cog6ToothIcon
        className="absolute w-6 h-6 cursor-pointer top-4 right-4"
        onClick={() => setShowSettings(!showSettings)}
      />
      {showSettings ? (
        <div className="absolute z-10 flex flex-col gap-2 p-2 top-12 right-4 bg-slate-800 rounded-xl">
          <button
            className="px-4 py-2 border rounded-full hover:scale-105 drop-shadow-lg text-slate-200 border-slate-200"
            onClick={() => setSelectionTables([...selectionTables, { id: createRandomString(), rows: {} }])}
          >
            Add Ranking Table
          </button>
          <button className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600" onClick={saveTables}>
            Save Tables
          </button>
          <button className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600" onClick={loadTables}>
            Load Tables
          </button>
          <button
            className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600"
            onClick={() => {
              setMainTableRows([{}]);
              let clearedTables = selectionTables.map((table) => {
                table.rows = {};
                return table;
              });
              setSelectionTables(clearedTables);
            }}
          >
            Reset Soundtracks
          </button>
          <button
            className="px-4 py-2 rounded-full hover:scale-105 drop-shadow-lg bg-slate-600"
            onClick={() => {
              saveTables();
              setMainTableRows([{}]);
              setSelectionTables([{ id: createRandomString(), rows: {} }]);
            }}
          >
            Reset Everything
          </button>
        </div>
      ) : null}
      <Table
        header={{ name: "Soundtrack", song: "Song" }}
        rows={mainTableRows}
        setRows={setMainTableRows}
        onDrag={onDrag}
      />
      <div className={`p-4 flex overflow-hidden items-center z-10 max-w-[100vw]`}>
        {/* <div className="flex gap-10"> */}
        <ul role="list" className="flex flex-row gap-2 overflow-x-scroll no-scrollbar w-max snap-x scroll-smooth">
          {selectionTables.map((table, index) => {
            const { title, rows } = table;

            const setTitle = (newTitle: string) => {
              const newTables = [...selectionTables];
              newTables[index].title = newTitle;
              setSelectionTables(newTables);
            };

            const setRow = (newRow: { rank: number; value: string }) => {
              const newTables = [...selectionTables];
              newTables[index].rows[newRow.rank] = newRow.value;
              setSelectionTables(newTables);
            };

            return (
              <li key={table.id} className="snap-start">
                <div className="relative">
                  {selectionTables.length > 1 && (
                    <button
                      className="absolute right-0 flex items-center p-1 border border-collapse rounded-full h-min w-min border-slate-200 text-slate-200 opacity-40 hover:opacity-100"
                      onClick={() => {
                        const newTables = [...selectionTables];
                        newTables.splice(index, 1);
                        setSelectionTables(newTables);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                  <DropTable
                    key={index}
                    mainRows={mainTableRows}
                    selectionTableRows={rows}
                    setRow={setRow}
                    draggedItem={draggedItem}
                    title={title ?? "Rank da tables"}
                    setTitle={setTitle}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
