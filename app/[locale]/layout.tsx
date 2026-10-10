import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { StyledRegistry } from "@/components/providers/styled-registry";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ToastProvider } from "@/components/providers/toast-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deliverance Church Eastern Bypass",
  description: "Deliverance Church Eastern Bypass: worship, ministries, sermons and community.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StyledRegistry>
          <ThemeProvider>
            <ToastProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </ToastProvider>
          </ThemeProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}
