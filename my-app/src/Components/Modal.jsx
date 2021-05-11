import { useRef } from "react";

const Modal = ({ children, closeModal }) => {

    const modalBox = useRef(null)

    return (<div className="modal" onClick={() => {
        closeModal(0)
    }}>
        <div className="modalBox" ref={modalBox} onClick={e => { e.stopPropagation(); }}>
            {children}
        </div>
    </div>);
}

export default Modal;