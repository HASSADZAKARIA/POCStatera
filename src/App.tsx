import React, { useState } from "react";
import { useAccountingData } from "./useAccountingData";
import { FileUploadModal } from "./components/FileUploadModal"; // Assure-toi que le chemin est correct
import { useDetailedIndicators } from './useDetailedIndicators';

import {
  BarChart,
  TrendingUp,
  TrendingDown,
  Truck,
  FileSpreadsheet,
  BarChart2,
  Users,
  Settings,
  LightbulbIcon,
  AlertCircle,
  Upload,
  X,
  Check,
  FileUp,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

// Types
interface KPICard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

interface PerformanceIndicator {
  name: string;
  value: string;
  comparison: string;
  status: "success" | "warning" | "danger";
}

interface MarketData {
  label: string;
  value: string;
  unit?: string;
}

interface Recommendation {
  type: "improvement" | "warning" | "info";
  message: string;
}

type View =
  | "dashboard"
  | "accounting"
  | "indicators"
  | "market"
  | "recommendations"
  | "settings";

function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [showImportSuccess, setShowImportSuccess] = useState(false);

  const { processIndicatorsData, calculerMoyennes } = useDetailedIndicators();
  const [showIndicatorUpload, setShowIndicatorUpload] = useState(false);


  //test
  const { comptesResultat, bilansComptables, processFileData } = useAccountingData();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleUpload = (data: any[]) => {
    processFileData(data);
    setIsUploadOpen(false);
  };
  //fin test

  const handleImport = () => {
    setIsImporting(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setShowImportSuccess(true);
          setTimeout(() => setShowImportSuccess(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const kpiCards: KPICard[] = [
    {
      title: "Chiffre d'affaires",
      value: "€125,000",
      change: "+12.5%",
      trend: "up",
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Marge brute",
      value: "€45,000",
      change: "+8.2%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Coûts carburant",
      value: "€28,500",
      change: "-3.1%",
      trend: "down",
      icon: <TrendingDown className="w-6 h-6 text-red-600" />,
    },
    {
      title: "Véhicules actifs",
      value: "12",
      change: "+2",
      trend: "up",
      icon: <Truck className="w-6 h-6 text-purple-600" />,
    },
  ];

  const performanceIndicators: PerformanceIndicator[] = [
    {
      name: "Taux de rotation des actifs",
      value: "3.2",
      comparison: "vs 2.8",
      status: "success",
    },
    {
      name: "Délai moyen de paiement",
      value: "45 jours",
      comparison: "vs 60 jours",
      status: "success",
    },
    {
      name: "Taux d'utilisation des véhicules",
      value: "78%",
      comparison: "vs 82%",
      status: "warning",
    },
    {
      name: "Coût par kilomètre",
      value: "€0.85",
      comparison: "vs €0.80",
      status: "warning",
    },
  ];

  const marketData: MarketData[] = [
    { label: "Coût moyen carburant", value: "€2.15", unit: "/L" },
    { label: "Marge moyenne secteur", value: "32", unit: "%" },
    { label: "Taux de croissance secteur", value: "+5.8", unit: "%" },
    { label: "Coût maintenance moyen", value: "€2,800", unit: "/véhicule" },
    { label: "Taux de faillite", value: "2.3", unit: "%" },
    { label: "Volume marchandises", value: "382M", unit: "tonnes-km" },
  ];

  const recommendations: Recommendation[] = [
    {
      type: "improvement",
      message:
        "Optimisez vos coûts de carburant en planifiant mieux vos itinéraires",
    },
    {
      type: "warning",
      message:
        "Votre taux d'utilisation des véhicules est inférieur à la moyenne du secteur",
    },
    {
      type: "info",
      message:
        "Envisagez l'acquisition d'un nouveau véhicule pour répondre à la demande croissante",
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {kpiCards.map((card, index) => (
                <Card
                  key={index}
                  className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Text className="text-gray-600">{card.title}</Text>
                      <Title className="text-2xl font-bold mt-2">
                        {card.value}
                      </Title>
                      <div
                        className={`flex items-center mt-2 ${card.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                          }`}
                      >
                        {card.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span>{card.change}</span>
                      </div>
                    </div>
                    {card.icon}
                  </div>
                </Card>
              ))}
            </div>

            <TabGroup>
              <TabList>
                <Tab>Performance</Tab>
                <Tab>Comparaison Marché</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <Card>
                      <Title>Indicateurs de Performance</Title>
                      <div className="space-y-4 mt-4">
                        {performanceIndicators.map((indicator, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:shadow-md"
                          >
                            <div>
                              <Text className="font-medium">
                                {indicator.name}
                              </Text>
                              <div className="flex items-center mt-1">
                                <span className="text-xl font-bold mr-2">
                                  {indicator.value}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {indicator.comparison}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-3 h-3 rounded-full ${indicator.status === "success"
                                  ? "bg-green-500"
                                  : indicator.status === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                            />
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card>
                      <Title>Recommandations</Title>
                      <div className="space-y-4 mt-4">
                        {recommendations.map((recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:shadow-md"
                          >
                            {recommendation.type === "improvement" ? (
                              <LightbulbIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                            ) : recommendation.type === "warning" ? (
                              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                            )}
                            <Text>{recommendation.message}</Text>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    {marketData.map((data, index) => (
                      <Card
                        key={index}
                        className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Text className="text-gray-600">{data.label}</Text>
                        <div className="flex items-baseline mt-2">
                          <Title className="text-2xl font-bold">
                            {data.value}
                          </Title>
                          {data.unit && (
                            <Text className="ml-1">{data.unit}</Text>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </>
        );
      case "accounting":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Données Comptables</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Télécharger le modèle Excel</span>
                </button>


                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FileUp className="w-5 h-5" />
                  <span>Importer des données</span>
                </button>

                {isUploadOpen && (
                  <FileUploadModal
                    onClose={() => setIsUploadOpen(false)}
                    onUpload={handleUpload}
                  />
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Dernière mise à jour</h3>
                <p className="text-gray-600">15 Mars 2024 à 14:30</p>
                <button className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>


            <div className="mt-8">
              {/* Affichage de tous les comptes de résultat */}
              {comptesResultat.map((cr, index) => (
                <div key={`cr-${index}`} className="bg-white shadow rounded p-4 mb-4">
                  <h3 className="text-lg font-bold">📊 Compte de Résultat #{index + 1}</h3>
                  <p>Chiffre d'affaires : {cr.CA} €</p>
                  <p>Marge brute : {(cr.CA - (cr.chargesCarburant + cr.entretien + cr.personnel + cr.amortissements)).toFixed(2)} €</p>
                  <p>Résultat d'exploitation : {(cr.CA - cr.chargesCarburant - cr.entretien - cr.personnel - cr.amortissements).toFixed(2)} €</p>
                  <p>Ratio Charges/CA : {((cr.chargesCarburant + cr.entretien + cr.personnel + cr.amortissements) / cr.CA * 100).toFixed(2)}%</p>
                  <p>CAF : {(cr.resultatNet + cr.amortissements).toFixed(2)} €</p>
                </div>
              ))}

              {/* Affichage de tous les bilans comptables */}
              {bilansComptables.map((bc, index) => (
                <div key={`bc-${index}`} className="bg-white shadow rounded p-4 mb-4">
                  <h3 className="text-lg font-bold">📈 Bilan Comptable #{index + 1}</h3>
                  <p>Valeur des Immobilisations : {bc.immobilisations} €</p>
                  <p>Dettes : {bc.dettes} €</p>
                  <p>Trésorerie : {bc.tresorerie} €</p>
                  <p>Capitaux Propres : {bc.capitauxPropres} €</p>
                  <p>Ratio d’endettement : {(bc.dettes / bc.capitauxPropres).toFixed(2)}</p>
                  <p>Autonomie Financière : {(bc.capitauxPropres / (bc.dettes + bc.capitauxPropres) * 100).toFixed(2)}%</p>
                  <p>Valeur nette du parc : {(bc.immobilisations - bc.dettes).toFixed(2)} €</p>
                </div>
              ))}
            </div>


          </div>
        );
      case "indicators":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md">
  <h2 className="text-2xl font-bold mb-6">Indicateurs Détaillés</h2>

  <button
    onClick={() => setShowIndicatorUpload(true)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    Importer des indicateurs détaillés CSV
  </button>

  {showIndicatorUpload && (
    <FileUploadModal
      onClose={() => setShowIndicatorUpload(false)}
      onUpload={(data) => {
        processIndicatorsData(data);
        setShowIndicatorUpload(false);
      }}
    />
  )}

  <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow">
    <h3 className="text-lg font-semibold mb-4">📌 Moyennes des Indicateurs importés :</h3>
    {calculerMoyennes() ? (
      <ul className="list-disc pl-5">
        <li>Missions effectuées : {calculerMoyennes()?.missionsEffectuees}</li>
        <li>Kilomètres parcourus : {calculerMoyennes()?.kmParcourus} km</li>
        <li>Trajets à vide : {calculerMoyennes()?.trajetsAVide}</li>
        <li>Volume transporté : {calculerMoyennes()?.volumeTotalTransporte}</li>
        <li>Capacité totale du camion : {calculerMoyennes()?.capaciteTotaleCamion}</li>
        <li>Montant carburant dépensé : {calculerMoyennes()?.montantCarburant} €</li>
        <li>Frais d'entretien moyens : {calculerMoyennes()?.fraisEntretien} €</li>
        <li>Livraisons à l'heure : {calculerMoyennes()?.livraisonsALHeure}</li>
        <li>Total livraisons : {calculerMoyennes()?.totalLivraisons}</li>
      </ul>
    ) : (
      <p className="text-gray-500">Aucune donnée importée pour le moment.</p>
    )}
  </div>
</div>
);
      case "market":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Analyse du Marché</h2>
            <div className="grid grid-cols-3 gap-6">
              {marketData.map((data, index) => (
                <Card
                  key={index}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-4">
                    <Text className="text-gray-600">{data.label}</Text>
                    <div className="flex items-baseline mt-2">
                      <Title className="text-2xl font-bold">{data.value}</Title>
                      {data.unit && <Text className="ml-1">{data.unit}</Text>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      case "recommendations":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Recommandations Détaillées
            </h2>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <Card
                  key={index}
                  className="transform transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-4 flex items-start space-x-4">
                    {recommendation.type === "improvement" ? (
                      <LightbulbIcon className="w-6 h-6 text-yellow-500" />
                    ) : recommendation.type === "warning" ? (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-blue-500" />
                    )}
                    <div>
                      <Text className="font-medium">
                        {recommendation.type === "improvement"
                          ? "Amélioration"
                          : recommendation.type === "warning"
                            ? "Attention"
                            : "Information"}
                      </Text>
                      <Text className="mt-1">{recommendation.message}</Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Préférences d'affichage</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Afficher les variations en pourcentage</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      defaultChecked
                    />
                    <span>Activer les notifications</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">
                  Paramètres de l'entreprise
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Secteur d'activité
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>Transport routier</option>
                      <option>Logistique</option>
                      <option>Transport mixte</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-8">
          <BarChart2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Stratera</h1>
        </div>

        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Tableau de bord", icon: BarChart },
            {
              id: "accounting",
              label: "Données comptables",
              icon: FileSpreadsheet,
            },
            { id: "indicators", label: "Indicateurs", icon: BarChart2 },
            { id: "market", label: "Comparaison marché", icon: Users },
            {
              id: "recommendations",
              label: "Recommandations",
              icon: LightbulbIcon,
            },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`flex items-center space-x-2 w-full p-2 rounded transition-colors ${currentView === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentView === "dashboard"
                ? "Tableau de bord"
                : currentView === "accounting"
                  ? "Données comptables"
                  : currentView === "indicators"
                    ? "Indicateurs"
                    : currentView === "market"
                      ? "Comparaison marché"
                      : currentView === "recommendations"
                        ? "Recommandations"
                        : "Paramètres"}
            </h2>
            <p className="text-gray-600">
              Analyse financière et performance opérationnelle
            </p>
          </div>

          {/* Import Modal */}
          {isImporting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Importation en cours
                  </h3>
                  <button
                    onClick={() => setIsImporting(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {importProgress}% - Importation des données...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Toast */}
          {showImportSuccess && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Importation réussie!</span>
            </div>
          )}

          <button
            onClick={handleImport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>Importer des données</span>
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;
