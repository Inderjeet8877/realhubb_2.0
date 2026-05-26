/**
 * Layout Component
 * Main layout wrapper with header, footer, social sidebar, and chatbot
 */

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
