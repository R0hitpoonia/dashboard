import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/warehouse/")({
  loader: () => {
    throw redirect({
      to: "/warehouse/products",
    });
  },
  component: () => <div>Hello, Please go to /warehouse/products !</div>,
});
