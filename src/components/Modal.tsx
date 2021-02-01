import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { switchShowModal } from "../actions/ActionCreator";
import { Context, ModalMode } from "../contexts/Context";
type Props = {
  children: React.ReactNode;
};

const Modal: React.FC<Props> = (props) => {
  const modalRoot = document.querySelector("#modal-root");
  const modalContainer = document.createElement("div");
  const modalMode = useContext(Context).state.modalMode;
  const dispatch = useContext(Context).dispatch;
  modalContainer.addEventListener("click", (event) => {
    // ModalをクリックしたときのみModalを非表示
    if (
      modalMode !== ModalMode.hidden &&
      event.target === event.currentTarget
    ) {
      switchShowModal(dispatch, ModalMode.hidden);
    }
  });
  useEffect(() => {
    modalContainer.classList.add("Modal");
    // modalContainer.onclick = (e) => {
    //   if (e.target === modalContainer) {
    //     props.toggleShowModal(false);
    //   }
    // };
    modalRoot?.appendChild(modalContainer);
    console.log(modalRoot?.childNodes);
    // clean up
    return () => {
      modalRoot?.removeChild(modalContainer);
    };
    // 以下を[modalRoot]にするとcontainerが大量生成されるはず
    //  >> 大丈夫だった。
  }, [modalContainer, modalRoot]);
  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(props.children, modalContainer);
};
export default Modal;
