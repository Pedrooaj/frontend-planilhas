import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import Scanner from "./Routes/Scanner.jsx";


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