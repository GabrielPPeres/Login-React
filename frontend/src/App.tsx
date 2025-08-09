import LoginRegisterPage from "./pages/LoginRegisterPage";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LoginRegisterPage />
      </div>
    </AuthProvider>
  );
}

export default App;
