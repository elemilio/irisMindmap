import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      {/* Cabecera */}
      <header className="bg-gradient-to-r from-[#6a1b9a] to-[#4a148c] text-white h-16 flex items-center justify-between px-4 shadow-md fixed top-0 left-0 w-full z-20">
  <div className="flex items-center">
    {/* Icono SVG */}
    <div className="w-10 h-10 mr-2">
      <svg
        id="logoName"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 360.9 147.4"
        className="w-full h-full"
      >
        {/* Resto del contenido del SVG */}
      </svg>
    </div>
    <span className="text-lg font-bold">IRIS</span>
  </div>
  <div className="text-sm font-medium flex items-center space-x-4">
    <button className="hover:text-gray-300">
      <span className="material-icons">cake</span>
    </button>
    <span>20è Aniversari d'IRIS</span>
    <button className="hover:text-gray-300">
      <span className="material-icons">power_settings_new</span>
    </button>
  </div>
</header>

      {/* Sidebar */}
      <aside className="bg-gray-100 text-gray-800 w-64 h-screen fixed top-16 left-0 shadow-md z-10">
  <div className="p-0">
    {/* Menú de navegación */}
    <ul className="text-sm font-medium">
      <li>
        <Link
          href="/"
          className="flex items-center w-full px-4 py-3 transition bg-gradient-to-r hover:from-[#6a1b9a] hover:to-[#4a148c] hover:text-white"
        >
          <span className="material-icons mr-3">home</span>
          HOLA
        </Link>
      </li>
      <li>
        <Link
          href="/introduction"
          className="flex items-center w-full px-4 py-3 transition bg-gradient-to-r hover:from-[#6a1b9a] hover:to-[#4a148c] hover:text-white"
        >
          <span className="material-icons mr-3">info</span>
          QUÈ SON LES INTEGRACIONS?
        </Link>
      </li>
      <li>
        <Link
          href="/complexity"
          className="flex items-center w-full px-4 py-3 transition bg-gradient-to-r hover:from-[#6a1b9a] hover:to-[#4a148c] hover:text-white"
        >
          <span className="material-icons mr-3">warning</span>
          REPTES
        </Link>
      </li>
      <li>
        <Link
          href="/mindmap"
          className="flex items-center w-full px-4 py-3 transition bg-gradient-to-r hover:from-[#6a1b9a] hover:to-[#4a148c] hover:text-white"
        >
          <span className="material-icons mr-3">schema</span>
          ESQUEMA
        </Link>
      </li>
    </ul>
  </div>
</aside>
    </>
  );
}