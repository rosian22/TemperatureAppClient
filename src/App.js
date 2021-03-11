import React from 'react'
import { QueryClient, QueryClientProvider} from 'react-query'
import Display from './Display.js';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Display />
    </QueryClientProvider>
  )
}

export default App;
