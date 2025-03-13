import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Scanner from "./routes/Scanner"
import GlobalProvider from "./context/Globalcontext"
import Lista from "./routes/Lista"
import { ToastContainer } from "react-toastify"

const AppRoutes = () => {
    return(
        <GlobalProvider>
        <Router>
            <Routes>
                <Route path="/scanner" element={<Scanner />} />
                <Route index element={<Lista />} />
            </Routes>
        <ToastContainer />
        </Router>
        </GlobalProvider>
    )
}

export default AppRoutes