import Header from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Home Page</title>
      </head>
      <body>
        <Header />
        <div className='overflow-x-hidden'>{children}</div>
      </body>
    </html>
  );
}
