import "./globals.css";

import { Inter, Roboto_Mono } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] });
const robotomono = Roboto_Mono({ subsets: ['latin'] })

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={robotomono.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
