import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, Variants } from "framer-motion";

const MEDIA_OPTIONS = ["Games", "Movies", "TV Shows", "Anime"];
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Home() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    timer.current = setTimeout(() => {
      position < MEDIA_OPTIONS.length - 1 ? setPosition(position + 1) : setPosition(0);
    }, 2000);
    return () => clearTimeout(timer);
  }, [position]);

  return (
    <main className="flex flex-col items-center min-h-screen px-10 pt-10">
      <Head>
        <title>Jordan's Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold">Jordan's Game</h1>
      <p className="text-lg mt-2">A game by someone who isn&apos;t Jordan</p>
      <motion.nav initial={false} animate={showHelp ? "open" : "closed"}>
        <button onClick={() => setShowHelp(!showHelp)} className="flex flex-col items-center justify-center my-4 gap-2">
          <div className="flex flex-col gap-2">First time playing?</div>
          <ChevronDownIcon className="w-6 h-6 animate-bounce" />
          <motion.ul
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05,
                },
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
              },
            }}
            className="flex flex-col gap-2 p-4 rounded-xl bg-slate-800 w-[500px]"
          >
            <motion.li variants={itemVariants}>
              Enter any number of {MEDIA_OPTIONS[position]} that have a soundtrack
              <br />
              into the top table
            </motion.li>
            <motion.li variants={itemVariants}>Roll the dice to get a random song for each soundtrack</motion.li>
            <motion.li variants={itemVariants}>Drag the song into a position in the bottom tables</motion.li>
          </motion.ul>
        </button>
      </motion.nav>
      <Link href="/play" className="px-4 py-2 mt-4 rounded-full hover:scale-110 drop-shadow-lg">
        <h2 className="text-2xl">Play the Game</h2>
      </Link>
    </main>
  );
}
