import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MainRoutes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
