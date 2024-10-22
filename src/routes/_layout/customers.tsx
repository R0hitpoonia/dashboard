import { Layout } from "@/components/custom/layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import ThemeSwitch from "@/components/custom/theme-switch";
import { UserNav } from "@/components/custom/user-nav";
import { Input } from "@/components/ui/input";
import { CustomBreadcrumb } from "@/components/custom/breadcrumb";

export const Route = createFileRoute("/_layout/customers")({
  component: Customers,
});

function Customers() {
  return (
    <>
      {/* <Layout.Body> */}
      <Outlet />
      {/* </Layout.Body> */}
    </>
  );
}
