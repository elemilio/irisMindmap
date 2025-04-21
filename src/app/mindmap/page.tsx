import Navbar from '@/components/Navbar';
import MindMap from '@/components/MindMap';

export default function Home() {
  const mindMapData = {
    name: "Integracions d'IRIS",
    children: [
      {
        name: 'PRÒPIES',
        category: 'PROPIES',
        children: [
          { name: "SPA: Backoffice d'IRIS" },
          { name: "WEB-ATE: Web Atenció en linia" },
          { name: 'PWA: Iris Mòbil' },
        ],
      },
      {
        name: 'INTERNES',
        category: 'INTERNES',
        children: [
          {
            name: 'DIRECTES / API (comunicació continua)',
            category: 'INTERNES',
            children: [
              { name: "IDP: Proveïdor d'identitat)" },
              { name: "ITACA: Alta de fitxes" },
              { name: "RAT: Registre d'activitat" },
              { name: 'Ariadna: Registre d\'instàncies' },
              { name: "MIB: Base de dades d'identitats" },
              { name: 'GeoCOD / GeoREST: Ubicació, plànol...)' },
              { name: 'Intranet: Formulari' },
            ],
          },
          {
            name: 'EXPORTACIONS (Enviament de fitxers)',
            category: 'INTERNES',
            children: [
              { name: 'XALOC: Exportació dades' },
              { name: "CityOS: Big Data d'indicadors de la ciutat" },
              { name: 'SICON: Servei d’impressió de cartes)' },
              { name: 'Power BI: Indicadors i estadístiques)' },
              { name: 'GPO' },
            ],
          },
        ],
      },
      {
        name: 'PÚBLIQUES',
        category: 'PUBLIQUES',
        children: [
          { name: "Butxaca: APP d'incidències a la via pública)" },
          { name: 'Portal de Tràmits: Formularis' },
          { name: 'Quioscs a les OACs' },
          { name: 'OpenData: Portal de dades obertes' },
          { name: 'Webs Informatives: Mòduls Drupal' },
        ],
      },
      {
        name: 'EXTERNES',
        category: 'EXTERNES',
        children: [
          { name: 'CRM de TMB: Transports metropolitans de Barcelona' },
          { name: "CRM d'AMB: Àrea metropolitana de Barcelona" },
        ],
      },
      {
        name: 'NOVETATS',
        category: 'NOVETATS',
        children: [
          { name: 'Butxaca: Ampliant funcionalitats per mostrar més informació al ciutadà de les seves fitxes' },
          { name: 'CELIA: Desenvolupant nova Integració' },
        ],
      },
    ],
  };

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <Navbar />
      {/* Contenedor principal con márgenes para el navbar y el sidebar */}
      <div
        className="ml-64 pt-16 flex-grow flex items-center justify-center"
        style={{ height: 'calc(100vh - 4rem)' }} // Ajusta la altura disponible
      >
        <br></br>
        <MindMap data={mindMapData} />
      </div>
    </div>
  );
}