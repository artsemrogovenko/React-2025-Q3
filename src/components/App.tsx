'use client';
import './App.css';
import { APP_ROUTES, FLEX_STYLE_ROUNDED } from './constants';
import { Header } from './components/Header.tsx';
import { FavoritesModal } from './components/FavoritesModal.tsx';
import { usePathname } from 'next/navigation';

function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAbout = pathname?.includes(APP_ROUTES.about);
  return (
    <>
      <div id="App">
        <div
          className={`${FLEX_STYLE_ROUNDED} flex-col w-full min-w-2xl mx-auto gap-[20px] items-center`}
        >
          <Header />
          {children}
        </div>
      </div>
      {!isAbout && <FavoritesModal />}
    </>
  );
}

export default App;
