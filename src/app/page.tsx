import Sidebar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar y cabecera */}
      <Sidebar />
      {/* Contenido principal */}
      <div className="flex-grow ml-64 pt-16 p-8 bg-gray-100 min-h-screen">
        <br></br>
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Hola</h1>
        <div className="bg-white shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Notificacions</h2>
          <p className="text-gray-500">Al traspàs ens van informar de vàries integracions, però d'altres les vam trovar per sorpresa </p>
        </div>
      </div>
    </div>
  );
}