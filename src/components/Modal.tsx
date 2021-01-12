import React, { useEffect } from "react";
import ReactDOM from "react-dom";
type Props = {
  children: React.ReactNode;
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = (props) => {
  const modalRoot = document.querySelector("#modal-root");
  const modalContainer = document.createElement("div");
  useEffect(() => {
    modalContainer.classList.add("Modal");
    modalContainer.onclick = (e) => {
      if (e.target === modalContainer) {
        props.toggleShowModal(false);
      }
    };
    modalRoot?.appendChild(modalContainer);
    // clean up
    return () => {
      modalRoot?.removeChild(modalContainer);
    };
    // 以下を[modalRoot]にするとcontainerが大量生成されるはず
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(props.children, modalContainer);
};
