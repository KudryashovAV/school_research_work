import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Пожалуйста, помогите в исследовании!",
  description: "Мне нужно получить как можно больше отзывов о роботах в наших семьях. Помогите пожалуйста в исследовании.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
