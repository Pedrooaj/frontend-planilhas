import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalProvider from "./context/GlobalContext";
import Scanner from "./routes/Scanner";
import Home from "./routes/Home"


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