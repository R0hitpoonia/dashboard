import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/warehouse/")({
  component: () => <div>Hello /_layout/warehouse/!</div>,
});
