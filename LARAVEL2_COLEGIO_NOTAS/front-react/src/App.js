import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import AlumnoPanel from './components/AlumnoPanel';
import AdminPanel from './components/AdminPanel'; // luego lo construimos

function App() {
  const { user } = useAuth();

  if (!user) return <LoginForm />;
  return user.is_admin ? <AdminPanel /> : <AlumnoPanel />;
}

export default App;
