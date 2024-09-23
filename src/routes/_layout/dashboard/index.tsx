import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/")({
  loader: () => {
    throw redirect({
      to: "/dashboard/overview",
    });
  },
  component: () => <div>Hello, Please go to /dashboard/overview!</div>,
});
