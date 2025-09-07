import "./globals.css";
import { UploadProvider } from './contexts/UploadContext';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UploadProvider>
          {children}
        </UploadProvider>
      </body>
    </html>
  );
}