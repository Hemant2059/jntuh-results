import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 text-center sm:text-left">JNTUH RESULTS</div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>This website is in beta version.</li>
          <li>See your results instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/academic"
          >
            Academic Result
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/classresult"
          >
            Class Result
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-1 flex-wrap items-center justify-center">
        If you have any suggestion. Message me on{" "}
        <Link className="text-blue-500 underline" href="/">
          Whatsapp
        </Link>
      </footer>
    </div>
  );
}
