import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import AdminRoutes from "./pages/routes/admin"
import UserRoutes from "./pages/routes/user"


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes/>}/>
          <Route path="/*" element={<UserRoutes/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
