import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Slider } from '@material-ui/core';
import { RootContext } from '../../../../contexts';
import './style.scss';

const FilterPrice = observer(() => {
  const { filterStore, transferMarketStore } = useContext(RootContext);
  const [value, setValue] = useState([0, 20]);

  const [isHover, setHover] = useState(false);

  const marks = () => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        value: `${i}`,
      });
    }
    return arr;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeCommitted = (event, value) => {
    const range = {
      min: value[0] + '000000',
      max: value[1] + '000000',
    };
    filterStore.selectPrice(range);
    transferMarketStore.filterByPrice();
  };
  const renderSlider = () => (
    <div
      className="wrapper--slider select"
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <div className="slider details">
        <div className="value min-value">
          <span>0</span>
        </div>
        <Slider
          marks={marks()}
          step={1}
          min={0}
          max={20}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
        />
        <div className="value max-value">
          <span>20m</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="Filter-by-price-container">
      <label className="label">
        <h3>select a price range</h3>
      </label>
      <div
        className="ranges"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="range select">
          <span>{value[0]}m</span>
        </div>
        <div className="range select">
          <span>{value[1]}m</span>
        </div>
      </div>

      {isHover && renderSlider()}
    </div>
  );
});
export default FilterPrice;
