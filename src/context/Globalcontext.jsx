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
    // Verifica se o patrimônio tem no máximo 8 caracteres
    if (patrimonio.length > 8) {
      toast.error("Patrimônio deve ter no máximo 8 caracteres", { autoClose: 3000, position: "bottom-center" });
      return;
    }
  
    // Verifica se o prefixo é válido
    const prefixosValidos = ["60", "87", "83", "087"];
    if (!prefixosValidos.some((prefixo) => patrimonio.startsWith(prefixo))) {
      toast.error(<span>Patrimônio <b>{patrimonio}</b> Inválido</span>, { autoClose: 3000, position: "bottom-center" });
      return;
    }
  
    // Formata os patrimônios antes de adicionar à lista
    if (["87", "83"].includes(patrimonio.slice(0, 2))) {
      patrimonio = patrimonio.slice(2);
    } else if (patrimonio.startsWith("087")) {
      patrimonio = patrimonio.slice(3);
    }
  
    // Verifica se o patrimônio já está na lista
    if (lista.patrimonios.includes(patrimonio)) {
      toast.warn("Patrimônio já está na lista...", { autoClose: 3000, position: "bottom-center" });
      return;
    }
  
    // Adiciona à lista
    setLista((prevLista) => ({
      ...prevLista,
      patrimonios: [...prevLista.patrimonios, patrimonio],
    }));
  
    toast.success(<span>Patrimônio Adicionado: <b>{patrimonio}</b></span>, {
      autoClose: 3000,
      position: "bottom-center",
    });
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

  const removerPatrimonio = (patrimonio) => {
    if(!lista.patrimonios.includes(patrimonio)){
      toast.warn("Patrimônio não encontrado na lista.", {
        autoClose: 3000,
        position: "bottom-center"
      })
      return;
    }

    setLista((prevLista) => ({
      ...prevLista,
      patrimonios: prevLista.patrimonios.filter((p) => p !== patrimonio)
    }))

    toast.success(<span>Patrimônio Removido: <b>{patrimonio}</b></span>, {
      autoClose: 3000,
      position: "bottom-center"
    })
  }

  const values = {
    lista,
    setLista,
    atualizarData,
    adicionarPatrimonio,
    adicionarDestino,
    adicionarOrigem,
    adicionarObservação,
    removerPatrimonio
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
