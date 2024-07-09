import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function Breadcrumb({ nav }: { nav: string[] }) {
  return (
    <Breadcrumbs>
      {nav &&
        nav.map((nav, index) => (
          <BreadcrumbItem key={index}>{nav}</BreadcrumbItem>
        ))}
    </Breadcrumbs>
  );
}
