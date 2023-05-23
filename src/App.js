import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import SideBar from './components/SideBar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

const queryClient = new QueryClient();


function App() {
  return (
    <>
      <SearchHeader />
      <div className="flex">
        <SideBar />
        <YoutubeApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </YoutubeApiProvider>
      </div>
    </>
  );
}

export default App;
