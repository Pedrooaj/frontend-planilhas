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
    // if (patrimonio.length > 8) {
    //   toast.error("Patrimônio Inválido",{ autoClose: 3000, position: "bottom-center" });
    // }else if(!["60", "87", "83", "087"].includes(patrimonio.slice(0,2))){
    //   toast.error("Patrimônio Inválido",{ autoClose: 3000, position: "bottom-center" });
    // }else{
    //   if(["87","83","087"].includes(patrimonio.slice(0,2))){
    //     patrimonio = patrimonio.slice(3)
    //   }
        if (!lista.patrimonios.includes(patrimonio)) {
            setLista((prevLista) => ({
              ...prevLista,
              patrimonios: [...prevLista.patrimonios, patrimonio],
            }));
            toast.success(`Patrimônio Adicionado: ${patrimonio}`, {
              autoClose: 3000,
              position: "bottom-center",
            });
          } else {
            toast.warn("Patrimônio ja está na lista...", {
              autoClose: 3000,
              position: "bottom-center",
            });
          }
    // }

   
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
