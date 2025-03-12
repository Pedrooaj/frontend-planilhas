import { createContext, useState } from "react";


const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [values, setValues] = useState(0);


    return <GlobalContext.Provider value={{values, setValues}}>{children}</GlobalContext.Provider>
}

export { GlobalContext, GlobalProvider};