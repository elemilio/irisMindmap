import MindMap from '@/components/MindMap';

export default function Home() {
  const mindMapData = {
    name: 'Integracions d\'IRIS',
    children: [
      {
        name: 'PRÒPIES',
        children: [
          { name: 'SPA: Backoffice d\'IRIS' },
          { name: 'WEB-ATE: Web Atenció en linia' },
          { name: 'PWA: Iris Mòbil' },
        ],
      },
      {
        name: 'INTERNES',
        children: [
          {
            name: 'DIRECTES / API (comunicació continua)',
            children: [
              { name: 'IDP (Proveïdor d\'identitat)' },
              { name: 'ITACA' },
              { name: 'RAT' },
              { name: 'Ariadna (Registre)' },
              { name: 'MIB (Base de dades d\'identitats)' },
              { name: 'GeoCOD / GeoREST (Ubicació, mapes)' },
              { name: 'Intranet (Formulari)' },
            ],
          },
          {
            name: 'EXPORTACIONS',
            children: [
              { name: 'XALOC' },
              { name: 'CityOS' },
              { name: 'Sicon (Impressions)' },
              { name: 'Power BI (Indicadors)' },
              { name: 'GPO' },
            ],
          },
        ],
      },
      {
        name: 'PUBLIQUES (Ciutadà)',
        children: [
          { name: 'Butxaca (incidencies a la via pública)' },
          { name: 'Portal de Tràmits' },
          { name: 'Quioscs a les OACs' },
          { name: 'OpenData' },
          { name: 'Webs Informatives (Drupal)' },
        ],
      },
      {
        name: 'EXTERNES',
        children: [
          { name: 'CRM de TMB' },
          { name: 'CRM d\'AMB (Àrea metropolitana de Barcelona)' },
          { name: 'Ampliant funcionalitats amb Butxaca per mostrar més informació al ciutadà de les seves fitxes.' },
          { name: 'Desenvolupant nova Integració amb CELIA' },
        ],
      },
    ],
  };

  return (
    <div className="dark flex items-center justify-center h-screen bg-background">
      <MindMap data={mindMapData} />
    </div>
  );
}