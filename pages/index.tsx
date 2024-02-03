import { useState } from "react";
import Head from "next/head";
import Table from "@/components/table";
import DropTable from "@/components/dropTable";

type RowProps = {
  rank?: number;
  name?: string;
  song?: string;
  editable?: boolean;
  updateRow?: (newRow: RowProps) => void;
};

export default function Home() {
  const [mainTableRows, setMainTableRows] = useState<RowProps[]>([{}]);

  const saveTables = () => {
    localStorage.setItem("mainTableRows", JSON.stringify(mainTableRows));
  };
  const loadTables = () => {
    const mainTableRows = localStorage.getItem("mainTableRows");
    if (mainTableRows) {
      setMainTableRows(JSON.parse(mainTableRows));
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between pt-24 px-24`}>
      <Head>
        <title>Rank da Soundtracks aye</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-10">
        <Table header={{ name: "Soundtrack", song: "Song" }} rows={mainTableRows} setRows={setMainTableRows} />
        <DropTable mainRows={mainTableRows} />
      </div>
      <footer className="flex gap-10 pb-6">
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
