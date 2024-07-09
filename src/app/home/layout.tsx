import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
