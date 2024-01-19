import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
// import Header from "@/components/Header";

export const metadata = {
  title: "Aasai Cashews Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div>
          <ClerkProvider>
            {/* <Header /> */}
            <main className="font-[sans-serif]">{children}</main>
          </ClerkProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
