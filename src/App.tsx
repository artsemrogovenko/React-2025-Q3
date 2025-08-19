import { useState, type SyntheticEvent } from 'react';
import Modal from './components/Modal';
import { MyButton } from './components/MyButton';
import Profile from './components/Profile';
import type { FormType } from './components/types';
import { BACKDROP_ID } from './constants';

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<FormType>('uncontrolled');
  const openModal = () => {
    setIsOpen(true);
  };
  const setFormType = (type: FormType) => {
    setType(type);
    openModal();
  };

  const handleClick = <T extends SyntheticEvent>(e: T) => {
    if (e.currentTarget.id === BACKDROP_ID) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div id="root">
      <div
        className="flex p-0 w-full bg-amber-200 items-center"
        onKeyDown={handleKeyDown}
      >
        <MyButton
          text="Uncontrolled form"
          onClick={() => setFormType('uncontrolled')}
        />
        <MyButton
          text="React Hook Form"
          onClick={() => setFormType('controlled')}
        />
        <Modal
          isOpen={isOpen}
          type={type}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Profile />
    </div>
  );
}
