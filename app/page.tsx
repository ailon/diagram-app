import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import dynamic from "next/dynamic";
import Link from "next/link";
import ImportDiagramButton from "./components/import-diagram-button";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramList = dynamic(() => import("./components/diagram-list"), {
  ssr: false,
});
const NewDiagramButton = dynamic(() => import("./components/new-diagram-button"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />

      <div className="w-full xl:w-8/12 mx-auto px-10 my-10">
        <h1 className="text-2xl lg:text-5xl text-violet-500 text-center mb-5">Create Diagrams</h1>
        <p className="text-base lg:text-lg text-center">
          Create, edit, and share flowcharts, org charts, mind maps, network and
          other diagrams. Your diagrams are saved locally and aren&apos;t
          transfered to any servers or services. <Link href="/about">Learn more</Link>.
        </p>
      </div>

      <div className="flex justify-center flex-col mx-auto">
        <NewDiagramButton />
        <ImportDiagramButton />
      </div>

      <div className="flex grow overflow-hidden m-4 p-4 bg-white rounded-lg mt-10">
        <DiagramList />
      </div>
    </>
  );
}
