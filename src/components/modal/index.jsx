import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

export default function Modal(props) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (props.visible) {
      enter();
    }
  });

  const enter = () => {
    setIsShow(true);
    // setAnimationType('enter');
  };
  const modalRoot = document.getElementById('modal');
  const { onClose } = props;
  const Mask = <div className="mask" />;
  return ReactDOM.createPortal(
    <div className="Modal-wrapper">
      {Mask}
      <div className="content">
        <div className="close-btn" onClick={onClose}>
          <img src={'/assets/images/close.png'} alt="close" />
        </div>
        {props.children}
      </div>
    </div>,
    modalRoot,
  );
}
