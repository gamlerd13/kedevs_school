import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
function ButtonBackArrow() {
  return (
    <Link href="/pago">
      <button
        type="button"
        className="hover:bg-slate-400 p-1 rounded-full bg-red-900 text-white"
      >
        <FaArrowLeft className="text-xl " />
      </button>
    </Link>
  );
}

export default ButtonBackArrow;
