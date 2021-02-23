import axios from "axios";
import { useEffect, useState } from "react";
import HistoriqueTable from "./HistoriqueTable";

const HistoriqueCommande = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/paiement/historique-commande"
      );
      setCommandes(data);
    };

    fetchCommandes();

    return () => setCommandes([]);
  }, []);

  return (
    <div className='historiqueCommande'>
      <HistoriqueTable commandes={commandes} />
    </div>
  );
};

export default HistoriqueCommande;
