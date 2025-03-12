import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext.jsx";
import Scanner from "./routes/Scanner.jsx";
import Home from "./routes/Home.jsx"


const AppRoutes = () => {
  return(
    <GlobalProvider>
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/scan" element={<Scanner />} />
      </Routes>
    </Router>
    </GlobalProvider>
  )
}

export default AppRoutes;