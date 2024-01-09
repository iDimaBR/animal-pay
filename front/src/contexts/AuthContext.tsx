import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Defina a tipagem para o contexto de autenticação
interface AuthContextType {
  message: string;
  logged: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  registerUser(cpf: string, password: string, name: string, birth_date: string, email: string, phone_number: string, shelter_name: string): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Crie o contexto de autenticação
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Crie um componente de provedor para o contexto de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setLogged] = useState(false);
  const [message, setMessage] = useState("");

  const login = async (cpf: string, password: string) => {
    try {
      const response = await api.post("/user/auth", { cpf, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setLogged(true);
        navigate(`/`);
      } else {
        setMessage("Usuário ou senha inválidos");
      }
    } catch (error) {
      setMessage("Ocorreu um erro interno, tente novamente mais tarde.");
    }
  };

  const registerUser = async (cpf: string, password: string, name: string, birth_date: string, email: string, phone_number: string, shelter_name: string): Promise<void> => {
    try {
      const response = await api.post("/user/create", { cpf, password, name, birth_date, email, phone_number, shelter_name });
      if (response.data && response.data.createdAt) {
        navigate(`/`);
      } else {
        setMessage("Usuário ou senha inválidos");
      }
    } catch (error) {
      setMessage("Ocorreu um erro interno, tente novamente mais tarde.");
    }
  };

  // Função para realizar o logout
  const logout = () => {
    localStorage.removeItem('token');
    setMessage("");
    navigate('/');
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ registerUser, message, logged: isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
