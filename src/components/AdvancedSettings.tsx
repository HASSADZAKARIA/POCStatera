import React from 'react';
import { Settings } from '../types';
import { Save, RefreshCw, Bell, Globe, Building, BarChart as ChartBar } from 'lucide-react';

interface AdvancedSettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleChange = (section: keyof Settings, key: string, value: any) => {
    onSettingsChange({
      ...settings,
      [section]: typeof settings[section] === 'object'
        ? { ...settings[section], [key]: value }
        : value
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Préférences générales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mode d'affichage</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.displayMode}
              onChange={(e) => handleChange('displayMode', '', e.target.value)}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Devise</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.currency}
              onChange={(e) => handleChange('currency', '', e.target.value)}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Informations de l'entreprise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.companyInfo.name}
              onChange={(e) => handleChange('companyInfo', 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.companyInfo.sector}
              onChange={(e) => handleChange('companyInfo', 'sector', e.target.value)}
            >
              <option>Transport routier</option>
              <option>Logistique</option>
              <option>Transport mixte</option>
              <option>Transport international</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Taille de l'entreprise</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.companyInfo.size}
              onChange={(e) => handleChange('companyInfo', 'size', e.target.value)}
            >
              <option>TPE (< 10 employés)</option>
              <option>PME (10-250 employés)</option>
              <option>ETI (250-5000 employés)</option>
              <option>Grande entreprise (> 5000 employés)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Région</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.companyInfo.region}
              onChange={(e) => handleChange('companyInfo', 'region', e.target.value)}
            >
              <option>Île-de-France</option>
              <option>Auvergne-Rhône-Alpes</option>
              <option>Nouvelle-Aquitaine</option>
              <option>Occitanie</option>
              <option>Hauts-de-France</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ChartBar className="w-5 h-5 mr-2" />
          Préférences d'affichage des données
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-blue-600"
              checked={settings.dataPreferences.showPercentages}
              onChange={(e) => handleChange('dataPreferences', 'showPercentages', e.target.checked)}
            />
            <span>Afficher les variations en pourcentage</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-blue-600"
              checked={settings.dataPreferences.showTrends}
              onChange={(e) => handleChange('dataPreferences', 'showTrends', e.target.checked)}
            />
            <span>Afficher les tendances</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-blue-600"
              checked={settings.dataPreferences.showPredictions}
              onChange={(e) => handleChange('dataPreferences', 'showPredictions', e.target.checked)}
            />
            <span>Afficher les prédictions</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type de graphique par défaut</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={settings.dataPreferences.chartType}
              onChange={(e) => handleChange('dataPreferences', 'chartType', e.target.value)}
            >
              <option value="line">Ligne</option>
              <option value="bar">Barre</option>
              <option value="area">Aire</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications et mises à jour
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-blue-600"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', '', e.target.checked)}
            />
            <span>Activer les notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded text-blue-600"
              checked={settings.autoRefresh}
              onChange={(e) => handleChange('autoRefresh', '', e.target.checked)}
            />
            <span>Actualisation automatique</span>
          </label>
          {settings.autoRefresh && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Intervalle d'actualisation</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={settings.refreshInterval}
                onChange={(e) => handleChange('refreshInterval', '', parseInt(e.target.value))}
              >
                <option value={300000}>5 minutes</option>
                <option value={600000}>10 minutes</option>
                <option value={1800000}>30 minutes</option>
                <option value={3600000}>1 heure</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Réinitialiser
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          onClick={() => console.log('Settings saved:', settings)}
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </button>
      </div>
    </div>
  );
};