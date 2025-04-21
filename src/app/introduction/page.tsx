import Navbar from '@/components/Navbar';

export default function Introduction() {
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <Navbar />
      {/* Contenedor principal con márgenes para el navbar y el sidebar */}
      <div className="flex-grow ml-64 pt-16 p-8 bg-gray-100 min-h-screen">
        <br></br>
        <h1 className="text-4xl font-bold text-purple-700 mb-8">Què són les integracions a <span className="text-blue-500">IRIS</span>?</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Les integracions en <span className="font-semibold text-blue-400">IRIS</span> són les connexions que permeten que 
          <span className="font-semibold text-blue-400"> IRIS</span> intercanviï informació i funcions amb altres plataformes 
          de l'Ajuntament de Barcelona.</h2>
          <p className="text-gray-500">Aquestes integracions són essencials per garantir una comunicació fluida i eficient entre els diferents sistemes, 
          millorant així els serveis oferts als ciutadans.</p>
        </div>
      </div>
    </div>
  );
}