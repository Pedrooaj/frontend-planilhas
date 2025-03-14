import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [lista, setLista] = useState({
    data: new Date().toISOString().split("T")[0],
    destino: "",
    origem: "",
    patrimonios: [],
    observacao: "",
  });

  const atualizarData = (novaData) => {
    setLista((prevLista) => ({
      ...prevLista,
      data: novaData,
    }));
  };

  const adicionarPatrimonio = (patrimonio) => {
    if (patrimonio.length > 8) {
      toast.error("Patrimônio deve ter no máximo 8 caracteres", { autoClose: 3000, position: "bottom-center" });
    } else if (!["60", "87", "83", "087"].some((prefixo) => patrimonio.startsWith(prefixo))) {
      // verifica se o prefixo e válido
      toast.error(`<span>Patrimônio <b>${patrimonio}</b> Inválido </span>`, { autoClose: 3000, position: "bottom-center" });
    }


    // formata os patrimônios antes de adicionar a lista
    if(["87", "83"].includes(patrimonio.slice(0, 2))){
      patrimonio = patrimonio.slice(2);
    }else if("087" === (patrimonio.slice(0,3))){
      patrimonio = patrimonio.slice(3);
    }


    // verifica se o patrimônio ja está na lista
    if (!lista.patrimonios.includes(patrimonio)) {
      setLista((prevLista) => ({
        ...prevLista,
        patrimonios: [...prevLista.patrimonios, patrimonio],
      }));
      toast.success(`<span>Patrimônio Adicionado: <b>${patrimonio}</b></span>`, {
        autoClose: 3000,
        position: "bottom-center",
      });
    } else {
      toast.warn("Patrimônio ja está na lista...", {
        autoClose: 3000,
        position: "bottom-center",
      });
    }



  };

  const adicionarDestino = (destino) => {
    setLista((prevLista) => ({
      ...prevLista,
      destino: destino,
    }));
  };

  const adicionarOrigem = (origem) => {
    setLista((prevLista) => ({
      ...prevLista,
      origem: origem,
    }));
  };

  const adicionarObservação = (observacao) => {
    setLista((prevLista) => ({
      ...prevLista,
      observacao: observacao,
    }));
  };

  const values = {
    lista,
    setLista,
    atualizarData,
    adicionarPatrimonio,
    adicionarDestino,
    adicionarOrigem,
    adicionarObservação,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
