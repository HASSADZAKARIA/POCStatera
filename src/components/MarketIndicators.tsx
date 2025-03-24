import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { MarketIndicator } from '../types';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MarketIndicatorsProps {
  indicators: MarketIndicator[];
}

export const MarketIndicators: React.FC<MarketIndicatorsProps> = ({ indicators }) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'Dynamique du marché':
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'Rentabilité sectorielle':
        return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'Coût et charges sectorielles':
        return <TrendingDown className="w-6 h-6 text-red-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {indicators.map((indicator, index) => (
        <Card 
          key={index}
          className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getIconForType(indicator.type)}
                <Text className="text-sm font-medium text-gray-500">{indicator.type}</Text>
              </div>
              <Title className="text-lg mb-2">{indicator.indicator}</Title>
              <Text className="text-sm text-gray-600 line-clamp-2">{indicator.usage}</Text>
              <Text className="text-xs text-gray-500 mt-2">Source: {indicator.sources}</Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};