interface Empresa {
  name: string;
  ruc: string;
}

interface Boleta {
  empresa: Empresa;
  pagador: string;
  cantidad: string;
  fecha: string;
  total: string;
}

const Boleta = ({ empresa, pagador, cantidad, fecha, total }: Boleta) => {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Boleta de Pago</h2>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">
          Nombre de la Empresa:
        </p>
        <p className="text-sm text-gray-600">{empresa.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">RUT de la Empresa:</p>
        <p className="text-sm text-gray-600">{empresa.ruc}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Nombre del Pagador:</p>
        <p className="text-sm text-gray-600">{pagador}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Cantidad:</p>
        <p className="text-sm text-gray-600">${cantidad}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Total:</p>
        <p className="text-sm text-gray-600">${total}</p>
      </div>
    </div>
  );
};

export default Boleta;
