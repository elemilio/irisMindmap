import Navbar from '@/components/Navbar';

export default function Complexity() {
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <Navbar />
      {/* Contenedor principal con márgenes para el navbar y el sidebar */}
      <div className="flex-grow ml-64 pt-16 p-8 bg-gray-100 min-h-screen">
        <br></br>
        <h1 className="text-4xl font-bold text-purple-700 mb-8">REPTES</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="flex items-center text-lg font-semibold text-purple-700 mb-4">
            <span className="material-icons mr-1">format_list_numbered</span>
            Quantitat
          </h2>
          <p className="text-gray-500">Gran nombre d'integracions</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="flex items-center text-lg font-semibold text-purple-700 mb-4">
            <span className="material-icons mr-1">category</span>
            Varietat
          </h2>
          <p className="text-gray-500">Varietat de tecnologies</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="flex items-center text-lg font-semibold text-purple-700 mb-4">
            <span className="material-icons mr-1">groups</span>
            Equips de manteniment
          </h2>
          <p className="text-gray-500">Diferents equips i contractes de manteniment dels sistemes que integrem i/o ens integrem</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="flex items-center text-lg font-semibold text-purple-700 mb-4">
            <span className="material-icons mr-1">folder_off</span>
            Poca informació
          </h2>
          <p className="text-gray-500">Això és comú, manca d'informació</p>
        </div>
      </div>
    </div>
  );
}