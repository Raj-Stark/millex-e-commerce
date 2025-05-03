import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CssBaseline, ThemeProvider } from "@mui/material";
import appTheme from "@/config/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Provider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farm Gear",
  description: "Buy quality products for your mill requirements",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon-96x96.png",
      },
    ],
    apple: "/apple-touch-icon-180x180.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AppRouterCacheProvider>
            <CssBaseline />
            <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </AppRouterCacheProvider>
        </Provider>
        {/** following node is to render models */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
