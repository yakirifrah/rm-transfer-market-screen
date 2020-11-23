import React from 'react';
import './style.scss';
import FilterRole from './role';
import FilterPrice from './price';
import FilterClub from './club';
import FilterName from './name';

export default function FilterContainer() {
  return (
    <div className="filters--wrapper">
      <div className="row">
        <FilterPrice />
        <FilterRole />
      </div>
      <div className="row">
        <FilterClub />
        <FilterName />
      </div>
    </div>
  );
}
