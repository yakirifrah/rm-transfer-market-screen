import React from 'react';
import FilterPosition from './position';
import FilterPrice from './price';
import FilterClub from './club';
import FilterName from './name';
import './style.scss';

export default function FilterContainer() {
  return (
    <div className="filters--wrapper">
      <div className="row">
        <FilterPrice />
        <FilterPosition />
      </div>
      <div className="row">
        <FilterClub />
        <FilterName />
      </div>
    </div>
  );
}
