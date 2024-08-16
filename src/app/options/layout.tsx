import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

export default function OptionsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
