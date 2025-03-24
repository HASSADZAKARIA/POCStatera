import { useState } from 'react';

interface CompteResultat {
  CA: number;
  chargesCarburant: number;
  entretien: number;
  personnel: number;
  amortissements: number;
  resultatNet: number;
}

interface BilanComptable {
  immobilisations: number;
  dettes: number;
  tresorerie: number;
  capitauxPropres: number;
}

export const useAccountingData = () => {
  const [compteResultat, setCompteResultat] = useState<CompteResultat | null>(null);
  const [bilanComptable, setBilanComptable] = useState<BilanComptable | null>(null);

  const processFileData = (data: any[]) => {
    const headers = Object.keys(data[0]);

    if (headers.includes('CA') && headers.includes('Résultat net')) {
      const row = data[0];
      setCompteResultat({
        CA: Number(row['CA']),
        chargesCarburant: Number(row['Charges carburant']),
        entretien: Number(row['Entretien']),
        personnel: Number(row['Personnel']),
        amortissements: Number(row['Amortissements']),
        resultatNet: Number(row['Résultat net']),
      });
      setBilanComptable(null);
    } else if (headers.includes('Immobilisations') && headers.includes('Dettes')) {
      const row = data[0];
      setBilanComptable({
        immobilisations: Number(row['Immobilisations']),
        dettes: Number(row['Dettes']),
        tresorerie: Number(row['Trésorerie']),
        capitauxPropres: Number(row['Capitaux propres']),
      });
      setCompteResultat(null);
    } else {
      alert("Erreur : fichier CSV non reconnu. Vérifiez vos en-têtes.");
    }
  };

  return { compteResultat, bilanComptable, processFileData };
};
