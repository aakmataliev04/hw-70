import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import './Modal.css';

interface Props extends React.PropsWithChildren {
  show: boolean;
  tittle?: string;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show, tittle, children, onClose}) => {
  return (
    <>
      <div
        className="modal-backdrop show"
        style={{display: show ? 'block' : 'none'}}
        onClick={onClose}
      />
      <AnimatePresence>
        <motion.div
          className="modal show"
          style={{display: show ? 'block' : 'none'}}
          onClick={onClose}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}>
          <div
            className="modal-dialog"
            onClick={(event) => {
              event.stopPropagation();
            }}>
            <div className="modal-content">
              <div className="modal-header">
                {tittle && <h1 className="modal-tittle fs-5">{tittle}</h1>}
                <button onClick={onClose} type="button" className="btn-close" style={{color: 'red'}}
                        aria-label="Close"></button>
              </div>
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Modal;
