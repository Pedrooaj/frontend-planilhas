import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { GlobalProvider } from "./Contexts/GlobalContext";


const AppRoutes = () => {
  return(
    <GlobalProvider>
    <Router>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Router>
    </GlobalProvider>
  )
}

export default AppRoutes;