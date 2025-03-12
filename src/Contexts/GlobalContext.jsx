import { createContext, useState } from "react";


export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [values, setValues] = useState(0);
    return <GlobalContext.Provider value={{values, setValues}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider