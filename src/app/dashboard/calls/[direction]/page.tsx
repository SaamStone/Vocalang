import { notFound } from "next/navigation";
import { CallActivityPanel } from "@/components/dashboard/CallActivityPanel";

export default async function CallDirectionPage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction } = await params;
  if (direction !== "inbound" && direction !== "outbound") notFound();

  return (
    <div className="mx-auto max-w-7xl px-2 py-4 sm:px-4">
      <CallActivityPanel direction={direction === "inbound" ? "incoming" : "outgoing"} />
    </div>
  );
}
