import ReactDOM from 'react-dom';
import './style.scss';

export default function Modal(props) {
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
