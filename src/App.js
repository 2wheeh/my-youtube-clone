import { Outlet, useLocation } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import SideBar from './components/SideBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from './context/YoutubeApiContext';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [hideSideBar, setHideSideBar] = useState(false);
  const path = useLocation();

  useEffect(() => {
    if (path.pathname.includes('watch')) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  }, [path]);

  return (
    <>
      <SearchHeader />
      <div className="flex">
        <SideBar hide={hideSideBar} />
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
