import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { routeTree } from "./routeTree.gen.ts";
import {
  ThemeProvider,
  useTheme,
} from "./components/custom/theme-provider.tsx";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    //   auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    theme: undefined!,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  // const auth = useAuth();
  const theme = useTheme();
  return <RouterProvider router={router} context={{ theme }} />; // context={{ auth }}
}

function App() {
  return (
    <>
      {/* <ReduxProvider>
      <AuthProvider> */}
      <ThemeProvider>
        <InnerApp />
      </ThemeProvider>
      {/* </AuthProvider>
    </ReduxProvider> */}
    </>
  );
}

export default App;
