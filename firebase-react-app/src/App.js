import { NavBar } from "./components/nav/NavBar";
import AuthProvider from "./providers/AuthProvider";
import FirebaseProvider from "./providers/FirebaseProvider";
import TheRoutes from "./routes/Routes";
import { TheApp } from "./TheApp";
function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <TheApp>
          <NavBar />
          <TheRoutes />;
        </TheApp>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
