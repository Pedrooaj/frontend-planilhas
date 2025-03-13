import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [lista, setLista] = useState({ data: new Date().toISOString().split("T")[0], destino: "", origem: "", patrimonios: [], observacao: "" });

    const atualizarData = (novaData) => {
        setLista((prevLista) => ({
          ...prevLista,
          data: novaData
        }));
      };
      
      const adicionarPatrimonio = (patrimonio) => {
        setLista((prevLista) => ({
          ...prevLista,
          patrimonios: [...prevLista.patrimonios, patrimonio]
        }));
      };

      const adicionarDestino = (destino) => {
        setLista((prevLista) => ({
            ...prevLista,
            destino: destino
        }))
      }

      const adicionarOrigem = (origem) => {
        setLista((prevLista) => ({
            ...prevLista,
            origem: origem
        }))
      }
      
      const adicionarObservação = (observacao) => {
        setLista((prevLista) => ({
            ...prevLista,
            observacao: observacao
        }))
      }

    const values = {
        lista,
        setLista,
        atualizarData,
        adicionarPatrimonio,
        adicionarDestino,
        adicionarOrigem,
        adicionarObservação
    }

    return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
}

export default GlobalProvider;