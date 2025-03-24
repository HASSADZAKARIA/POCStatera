import { useState } from 'react';

export interface CompteResultat {
  CA: number;
  chargesCarburant: number;
  entretien: number;
  personnel: number;
  amortissements: number;
  resultatNet: number;
}

export interface BilanComptable {
  immobilisations: number;
  dettes: number;
  tresorerie: number;
  capitauxPropres: number;
}

export const useAccountingData = () => {
  const [comptesResultat, setComptesResultat] = useState<CompteResultat[]>([]);
  const [bilansComptables, setBilansComptables] = useState<BilanComptable[]>([]);

  const processFileData = (data: any[]) => {
    const headers = Object.keys(data[0]);

    if (headers.includes('CA') && headers.includes('Résultat net')) {
      const row = data[0];
      const nouveauCompte: CompteResultat = {
        CA: Number(row['CA']),
        chargesCarburant: Number(row['Charges carburant']),
        entretien: Number(row['Entretien']),
        personnel: Number(row['Personnel']),
        amortissements: Number(row['Amortissements']),
        resultatNet: Number(row['Résultat net']),
      };
      setComptesResultat((prev) => [...prev, nouveauCompte]);
    } else if (headers.includes('Immobilisations') && headers.includes('Dettes')) {
      const row = data[0];
      const nouveauBilan: BilanComptable = {
        immobilisations: Number(row['Immobilisations']),
        dettes: Number(row['Dettes']),
        tresorerie: Number(row['Trésorerie']),
        capitauxPropres: Number(row['Capitaux propres']),
      };
      setBilansComptables((prev) => [...prev, nouveauBilan]);
    } else {
      alert("Erreur : fichier CSV non reconnu. Vérifiez vos en-têtes.");
    }
  };

  return { comptesResultat, bilansComptables, processFileData };
};
