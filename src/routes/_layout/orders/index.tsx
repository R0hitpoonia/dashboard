import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/orders/")({
  component: () => <div>Hello /_layout/orders/!</div>,
});
