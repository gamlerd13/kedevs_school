import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

export default function OptionsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center mt-8">
        <div className="w-11/12 ">{children}</div>
      </div>
    </div>
  );
}
