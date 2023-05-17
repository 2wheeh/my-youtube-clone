import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import SideBar from './components/SideBar';
import CategoryHeader from './components/CategoryHeader';

function App() {
  return (
    <>
      <SearchHeader />
      <SideBar />
      <CategoryHeader />
      <Outlet />
    </>
  );
}

export default App;
