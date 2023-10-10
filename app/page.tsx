import { Separator } from "@/components/ui/separator";
import DiagramList from "./components/diagram-list";
import NewDiagramButton from "./components/new-diagram-button";

export default function Home() {
  return (
    <>
      <div className="w-6/12 mx-auto my-10">
        <h1 className="text-xl text-purple-600">Create diagrams</h1>
        <p>
          Create, edit, and share flowcharts, org charts, mind maps, network and
          other diagrams. Your diagrams are saved locally and aren&apos;t
          transfered to any servers or services.
        </p>
      </div>

      <div className="flex justify-center">
        <NewDiagramButton />
      </div>


      <Separator className="my-10" decorative={true} />

      <DiagramList />
    </>
  );
}
