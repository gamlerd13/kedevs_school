"use client";
import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "Alumno",
      url: "/alumno",
    },
    {
      id: 3,
      name: "Pago",
      url: "/pago",
    },
    {
      id: 4,
      name: "Concepto de Pago",
      url: "/pago/concepto",
    },
    {
      id: 5,
      name: "reportes",
      url: "/reportes",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Logo Colegio</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname == "/alumno"}>
          <Link color="foreground" href="/alumno">
            Alumnos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/pago"}>
          <Link href="/pago" aria-current="page">
            Pagos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/pago/concepto"}>
          <Link href="/pago/concepto" aria-current="page">
            Concepto Pago
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/reportes"}>
          <Link color="foreground" href="/reportes">
            reportes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={() => signOut()} color="default" variant="flat">
            Salir
            <IoIosLogOut />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.id}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className={`w-full text-default-400 ${pathname == item.url && "font-semibold text-blue-500"}`}
              href={item.url}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
// TODO: setup logout
