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
        <div className="flex-1">
          <YoutubeApiProvider>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </YoutubeApiProvider>
        </div>
      </div>
    </>
  );
}

export default App;
