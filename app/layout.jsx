import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

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
            <main className="font-[sans-serif]">{children}</main>
          </ClerkProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
