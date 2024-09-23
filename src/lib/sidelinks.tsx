import {
  ChartNoAxesColumn,
  ChartNoAxesGantt,
  LayoutDashboard,
  Library,
  Box,
  PackageOpen,
  Boxes,
  ShoppingBag,
  User,
  Bolt,
  SquareChartGantt,
  Unplug
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}
export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
    sub: [
      {
        title: "Overview",
        label: "",
        href: "/dashboard/overview",
        icon: <ChartNoAxesGantt size={18} />,
      },
      {
        title: "Analytics",
        label: "",
        href: "/dashboard/analytics",
        icon: <ChartNoAxesColumn size={18} />,
      },
      {
        title: "Reports",
        label: "",
        href: "/dashboard/report",
        icon: <Library size={18} />,
      },
    ],
  },
  {
    title: "Warehouse",
    label: "",
    href: "/warehouse",
    icon: <Box size={18} />,
    sub: [
      {
        title: "Products",
        label: "",
        href: "/warehouse/products/all",
        icon: <PackageOpen size={18} />,
      },
      {
        title: "Categories",
        label: "",
        href: "/warehouse/categories/all",
        icon: <Boxes size={18} />,
      },
    ],
  },
  {
    title: "Orders",
    label: "",
    href: "/orders",
    icon: <ShoppingBag size={18} />
  },
  {
    title: "customers",
    label: "",
    href: "/customers",
    icon: <User size={18} />
  },
  {
    title: "Setting",
    label: "",
    href: "/setting",
    icon: <Bolt size={18} />,
    sub: [
      {
        title: "Profile",
        label: "",
        href: "/setting/profile",
        icon: <User size={18} />
      },
      {
        title: "Management",
        label: "",
        href: "/setting/management",
        icon: <SquareChartGantt size={18} />
      },
      {
        title: "Logout",
        label: "",
        href: "/setting/logout",
        icon: <Unplug size={18} />
      }
    ]
  },
];
