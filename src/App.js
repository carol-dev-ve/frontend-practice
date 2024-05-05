import './App.css';
import LoadCSV from './components/LoadCSV';
import Layout from './components/Layout/Layout';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Layout>
      <LoadCSV/>
    </Layout>
    </QueryClientProvider>

  );
}

export default App;
