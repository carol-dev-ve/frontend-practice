import "./App.css";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import SimpleRouter from "./router/SimpleRouter";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <SimpleRouter/>
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
