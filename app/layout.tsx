import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "@/components/app-bar";
import appTheme from "@/config/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <CssBaseline />
          <ThemeProvider theme={appTheme}>
            <ResponsiveAppBar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
