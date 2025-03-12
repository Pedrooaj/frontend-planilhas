import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { GlobalProvider } from "./Contexts/GlobalContext";
import Scanner from "./Routes/Scanner";


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