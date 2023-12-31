import "@styles/globals.css";

export const metadata = {
  title: "Aasai Cashews Services",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
