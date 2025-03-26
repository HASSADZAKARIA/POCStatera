import { useState } from "react";
import Papa from "papaparse";

export interface MarketData {
  gazolePro: number;
  maintenance: number;
  indiceLDEA: number;
}

export const useMarketComparison = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const parseNumber = (value: string) => parseFloat(value.replace(",", "."));

  const importMarketCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const latestRow = results.data[results.data.length - 1] as Record<string, string>;

        if (latestRow && latestRow["Indice CNR gazole professionnel"]) {
          const parsedData: MarketData = {
            gazolePro: parseNumber(latestRow["Indice CNR gazole professionnel"]),
            maintenance: parseNumber(latestRow["Indice CNR maintenance"]),
            indiceLDEA: parseNumber(latestRow["Indice CNR LD EA"]),
          };

          setMarketData(parsedData);
        } else {
          console.error("La ligne la plus récente est incorrecte ou manque des données.");
        }
      },
    });
  };

  const getLatestMarketData = () => marketData;

  return { importMarketCSV, getLatestMarketData };
};
