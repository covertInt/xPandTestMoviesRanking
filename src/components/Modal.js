import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../index.css";

const Modal = (props) => {
  // we shall have some state to store open and closed states of the modal in the parent component
  const { show, setShow } = props;

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("click", handleClickInside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("click", handleClickInside, false);
    };
  });

  const handleClickInside = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      setShow(false);
    }
  };

  return show ? (
    <div className="modal-wrapperTest">
      <div /* className="modal-backdrop" */>
        <div />
        <div ref={ref} className="modal-box">
          {props.children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
