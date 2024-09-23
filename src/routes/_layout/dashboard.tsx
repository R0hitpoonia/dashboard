import { Layout } from "@/components/custom/layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import ThemeSwitch from "@/components/custom/theme-switch";
import { UserNav } from "@/components/custom/user-nav";
import { Input } from "@/components/ui/input";
import { CustomBreadcrumb } from "@/components/custom/breadcrumb";

export const Route = createFileRoute("/_layout/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <Layout>
      <Layout.Header>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <CustomBreadcrumb />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      {/* <Layout.Body> */}
      <Outlet />
      {/* </Layout.Body> */}
    </Layout>
  );
}
