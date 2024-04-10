import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "@/component/Layout/Layout";

export const metadata = {
  title: "Skill Test",
  description: "Test the developer skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout> {children} </Layout>
      </body>
    </html>
  );
}
