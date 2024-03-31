import { useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TableProps, RowProps, PlaylistInfo } from "@/types";
import { PlusCircleIcon, MinusCircleIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { Cell } from "./cells";
import randomNumber from "@/utils/randomNumber";

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

const Row = ({
  rank,
  song: songTitleProp,
  name = "",
  editable = false,
  updateRow,
  removeRow,
  onDrag = () => {},
}: RowProps) => {
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>();
  const [isSearchingPlaylist, setIsSearchingPlaylist] = useState<Boolean>(false);
  const [songRolled, setSongRolled] = useState<number>(0);
  const [rollingSong, setRollingSong] = useState<Boolean>(false);
  const [songData, setSongData] = useState<any>();

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRow?.({ rank, name: e.target.value });
  };

  // Calls the search youtube route
  const searchPlaylist = async () => {
    setIsSearchingPlaylist(true);
    if (name === "") return;
    const response = await axios.get(`/api/searchPlaylist?searchQuery=${name} ost`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}` },
    });
    setPlaylistInfo(response.data);
    setIsSearchingPlaylist(false);
  };

  const rollSong = async () => {
    if (!playlistInfo) return;
    setRollingSong(true);
    const finalIndex = randomNumber(playlistInfo.pageInfo.totalResults);
    // whilst the request is triggering update the UI to show that the song is being rolled with random rolls
    let i = 0;
    const interval = setInterval(() => {
      if (i === 10) {
        setSongRolled(finalIndex);
        clearInterval(interval);
      } else {
        const randomIndex = randomNumber(playlistInfo.pageInfo.totalResults);
        setSongRolled(randomIndex);
        i++;
      }
    }, 100);
    const song = await axios.get(`/api/findSong?playlistId=${playlistInfo.playlistId}&index=${finalIndex}`);
    setSongData(song.data);
    setRollingSong(false);
  };

  // The fuck have i done here ???
  const songContent = useMemo(() => {
    if (songTitleProp) return songTitleProp;

    if (isSearchingPlaylist) return "Searching youtube playlists...";

    if (rollingSong) {
      return (
        <span className="animate-pulse">
          Rolling song... <b>{songRolled}</b>
        </span>
      );
    }
    if (songData?.snippet.title) {
      return (
        <a
          href={`https://www.youtube.com/watch?v=${songData.contentDetails.videoId}&list=${playlistInfo?.playlistId}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs underline whitespace-nowrap"
        >
          {songData.snippet.title} <span className="opacity-80">{songRolled}</span>
        </a>
      );
    }

    if (playlistInfo?.pageInfo?.totalResults && playlistInfo.pageInfo.totalResults > 0) {
      return (
        <span className="text-slate-200">
          <button
            className="flex items-center gap-1 px-2 border rounded-full shadow-md border-1 border-slate-200"
            onClick={rollSong}
          >
            Playlist of {playlistInfo.pageInfo.totalResults}
            <Image src="/diceIcon.svg" alt="Dice Icon" width={24} height={24} />
          </button>
        </span>
      );
    }
    return "";
  }, [isSearchingPlaylist, rollingSong, songRolled, songData, playlistInfo]);

  return (
    <div className="flex" draggable onDrag={(e) => onDrag(e, name)}>
      <Cell content={rank?.toString()} className="w-[42px] overflow-hidden" />
      <span className="relative">
        <Cell content={name} onChange={updateName} editable={editable} className="min-w-[250px]" />
        {rank && (
          <span className="absolute right-0 top-[4.5px] text-slate-200">
            {playlistInfo?.playlistId ? (
              <button className="flex items-center px-2 rounded-md opacity-40 hover:opacity-100" onClick={rollSong}>
                <Image src="/diceIcon.svg" alt="Dice Icon" width={24} height={24} />
              </button>
            ) : (
              <button
                className="flex items-center px-2 rounded-md opacity-40 hover:opacity-100"
                onClick={searchPlaylist}
              >
                <MagnifyingGlassCircleIcon className="w-6 h-6" />
              </button>
            )}
          </span>
        )}
      </span>
      <span className="relative flex w-">
        <Cell content={songContent} className="w-[250px] flex-grow overflow-x-scroll no-scrollbar" />
      </span>
      {rank && (
        <div className="flex justify-end">
          <button
            className={`flex items-center px-2 rounded-md opacity-40 hover:opacity-100 text-slate-200`}
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
