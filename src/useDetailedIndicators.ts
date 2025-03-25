import { useState } from 'react';

export interface DetailedIndicator {
  date: string;
  identifiantCamion: string;
  missionsEffectuees: number;
  kmParcourus: number;
  trajetsAVide: number;
  volumeTotalTransporte: number;
  capaciteTotaleCamion: number;
  montantCarburant: number;
  fraisEntretien: number;
  livraisonsALHeure: number;
  totalLivraisons: number;
}

export interface DetailedIndicatorAverages {
    missionsEffectuees: string;
    kmParcourus: string;
    trajetsAVide: string;
    volumeTotalTransporte: string;
    capaciteTotaleCamion: string;
    montantCarburant: string;
    fraisEntretien: string;
    livraisonsALHeure: string;
    totalLivraisons: string;
  }

export const useDetailedIndicators = () => {
  const [indicators, setIndicators] = useState<DetailedIndicator[]>([]);

  const processIndicatorsData = (data: any[]) => {
    const nouveauxIndicateurs = data.map((row) => ({
      date: row['Date'],
      identifiantCamion: row['Identifiant du camion'],
      missionsEffectuees: Number(row['Nombre de missions effectuées']),
      kmParcourus: Number(row['Nombre de km parcourus']),
      trajetsAVide: Number(row['Nombre de trajets à vide']),
      volumeTotalTransporte: Number(row['Volume total transporté']),
      capaciteTotaleCamion: Number(row['Capacité totale du camion']),
      montantCarburant: Number(row['Montant carburant dépensé']),
      fraisEntretien: Number(row['Frais d’entretien éventuels'] || 0),
      livraisonsALHeure: Number(row['Nombre de livraisons à l’heure']),
      totalLivraisons: Number(row['Nombre total de livraisons']),
    }));

    setIndicators((prev) => [...prev, ...nouveauxIndicateurs]);
  };

  const calculerMoyennes = (): DetailedIndicatorAverages | null => {
    const total = indicators.length;
    if (total === 0) return null;
  
    const somme = indicators.reduce((acc, cur) => ({
      missionsEffectuees: acc.missionsEffectuees + cur.missionsEffectuees,
      kmParcourus: acc.kmParcourus + cur.kmParcourus,
      trajetsAVide: acc.trajetsAVide + cur.trajetsAVide,
      volumeTotalTransporte: acc.volumeTotalTransporte + cur.volumeTotalTransporte,
      capaciteTotaleCamion: acc.capaciteTotaleCamion + cur.capaciteTotaleCamion,
      montantCarburant: acc.montantCarburant + cur.montantCarburant,
      fraisEntretien: acc.fraisEntretien + cur.fraisEntretien,
      livraisonsALHeure: acc.livraisonsALHeure + cur.livraisonsALHeure,
      totalLivraisons: acc.totalLivraisons + cur.totalLivraisons,
    }), {
      missionsEffectuees: 0,
      kmParcourus: 0,
      trajetsAVide: 0,
      volumeTotalTransporte: 0,
      capaciteTotaleCamion: 0,
      montantCarburant: 0,
      fraisEntretien: 0,
      livraisonsALHeure: 0,
      totalLivraisons: 0,
    });
  
    return {
      missionsEffectuees: (somme.missionsEffectuees / total).toFixed(2),
      kmParcourus: (somme.kmParcourus / total).toFixed(2),
      trajetsAVide: (somme.trajetsAVide / total).toFixed(2),
      volumeTotalTransporte: (somme.volumeTotalTransporte / total).toFixed(2),
      capaciteTotaleCamion: (somme.capaciteTotaleCamion / total).toFixed(2),
      montantCarburant: (somme.montantCarburant / total).toFixed(2),
      fraisEntretien: (somme.fraisEntretien / total).toFixed(2),
      livraisonsALHeure: (somme.livraisonsALHeure / total).toFixed(2),
      totalLivraisons: (somme.totalLivraisons / total).toFixed(2),
    };
  };
  

  return { indicators, processIndicatorsData, calculerMoyennes };
};
