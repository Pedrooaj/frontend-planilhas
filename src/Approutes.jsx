import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Scanner from "./routes/Scanner"
import GlobalProvider from "./context/Globalcontext"

const AppRoutes = () => {
    return(
        <GlobalProvider>
        <Router>
            <Routes>
                <Route path="/scanner" element={<Scanner />} />
                <Route index element={<h1>Rota de lista</h1>} />
            </Routes>
        </Router>
        </GlobalProvider>
    )
}

export default AppRoutes