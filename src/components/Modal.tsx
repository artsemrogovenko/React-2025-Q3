import { createPortal } from 'react-dom';
import type { ModalProps } from './types';
import { BACKDROP_ID } from '../constants';
import MyForm from './MyForm';
import { useRef } from 'react';

export default function Modal(props: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const { isOpen, type, onClick, onKeyDown } = props;
  if (!isOpen) return null;

  const handleClose = () => {
    if (backdropRef.current) {
      const event = new MouseEvent('click', { bubbles: true });
      backdropRef.current.dispatchEvent(event);
    }
  };
  return createPortal(
    <>
      <div
        className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0  bg-cyan-950  opacity-90"
        id={BACKDROP_ID}
        onClick={onClick}
        ref={backdropRef}
      />
      <div
        className="flex flex-col fixed bg-amber-500 top-1/2 left-1/2  -translate-x-1/2  -translate-y-1/2 p-5"
        onKeyDown={onKeyDown}
      >
        <h2 className="uppercase font-bold">test modal {type}</h2>
        <MyForm closeModal={handleClose} type={type} />
      </div>
    </>,
    document.body
  );
}
