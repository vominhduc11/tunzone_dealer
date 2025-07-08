import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import AuthGuard from "@/components/AuthGuard";
import ThemeScript from "@/components/ThemeScript";
import Toast from "@/components/notifications/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuneZone Nhà Phân Phối - Nền Tảng Âm Thanh Cao Cấp Bán Sỉ",
  description: "Truy cập giá bán sỉ cho thiết bị âm thanh cao cấp với hỗ trợ chuyên nghiệp và giao hàng nhanh. Duyệt hàng nghìn sản phẩm từ các thương hiệu hàng đầu với giá bán sỉ cạnh tranh.",
  keywords: "thiết bị âm thanh, bán sỉ, âm thanh ô tô, rạp hát tại nhà, âm thanh chuyên nghiệp, âm thanh hàng hải, giá số lượng lớn, nhà phân phối",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-transition`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <NotificationProvider>
                    <AuthGuard>
                      {children}
                    </AuthGuard>
                    <Toast />
                  </NotificationProvider>
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
