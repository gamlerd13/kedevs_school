import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-beige flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-black mb-4">
                Sistema de Gestión de Pagos para Colegios
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Nuestro sistema permite gestionar eficientemente los pagos de
                los estudiantes, facilitando el seguimiento de las cuotas y la
                emisión de recibos de manera rápida y sencilla.
              </p>
              <p className="text-md text-gray-600 mb-6">
                Desarrollado pensando en la administración escolar, este sistema
                asegura que todas las transacciones sean seguras y estén
                registradas de manera organizada.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://instagram.com" className="text-gray-700">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://facebook.com" className="text-gray-700">
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a href="https://linkedin.com" className="text-gray-700">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://solucionesteknoclient.com/wp-content/uploads/2021/03/pago1-1024x812.png"
                alt="Sistema de Gestión de Pagos"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Link
            href="/pago"
            className="block bg-white shadow-md rounded-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-black mb-2">Pagos</h2>
            <p className="text-gray-600">
              Gestiona los pagos de los estudiantes
            </p>
          </Link>
          <Link
            href="/alumnos"
            className="block bg-white shadow-md rounded-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-black mb-2">Alumnos</h2>
            <p className="text-gray-600">
              Administra la información de los alumnos
            </p>
          </Link>
          <Link
            href="/pago/concepto"
            className="block bg-white shadow-md rounded-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-black mb-2">
              Conceptos de Pago
            </h2>
            <p className="text-gray-600">
              Define y gestiona los conceptos de pago
            </p>
          </Link>
          <Link
            href="/reportes"
            className="block bg-white shadow-md rounded-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-black mb-2">Reportes</h2>
            <p className="text-gray-600">Genera reportes de pagos y más</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Page;
