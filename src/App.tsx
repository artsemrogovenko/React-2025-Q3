import './App.css';
import { useContext, useEffect } from 'react';
import {
  APP_ROUTES,
  AppContext,
  CLASSNAME_DARK,
  FLEX_STYLE_ROUNDED,
} from './constants';
import { Header } from './components/Header.tsx';
import { FavoritesModal } from './components/FavoritesModal.tsx';
import { Outlet, useLocation } from 'react-router';

function App() {
  const { pathname } = useLocation();

  const context = useContext(AppContext);
  useEffect(() => {
    if (context.isDefaultTheme) {
      document.body.classList.remove(CLASSNAME_DARK);
    } else {
      document.body.classList.add(CLASSNAME_DARK);
    }
  }, [context.isDefaultTheme]);

  const isAbout = pathname.includes(APP_ROUTES.about);
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
      {!isAbout && <FavoritesModal />}
    </>
  );
}

export default App;
