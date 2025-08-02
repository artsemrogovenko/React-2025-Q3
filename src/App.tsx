import './App.css';
import { useContext, useEffect } from 'react';
import { AppContext, FLEX_STYLE_ROUNDED } from './constants';
import { Header } from './components/Header.tsx';
import { FavoritesModal } from './components/FavoritesModal.tsx';
import { Outlet } from 'react-router';

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context.isDefaultTheme) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [context.isDefaultTheme]);

  return (
    <>
      <div id="App">
        <div
          className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-w-2xl mx-auto gap-[20px] items-center`}
        >
          <Header />
          <Outlet />
        </div>
      </div>
      <FavoritesModal />
    </>
  );
}

export default App;
