import React from 'react';
import './style.scss';

export default function Header(props) {
  const { title } = props;
  return (
    <div className="Header--container">
      <header className="Header--container__content">
        <div className="Header--container__content">
          <span className="Header--container__content__title">Transfer market</span>
        </div>
        <div className="Header--container__content__icon">
          <img className="sponsor-img" src={'assets/images/sponsor.png'} alt="sponsor" />
        </div>
      </header>
    </div>
  );
}
