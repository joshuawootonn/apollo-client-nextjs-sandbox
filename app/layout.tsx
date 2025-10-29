import type { Metadata } from "next";
import { ApolloWrapper } from "./components/ApolloProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apollo Client + Next.js Sandbox",
  description: "A sandbox for exploring Apollo Client with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
