import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../../../contexts';
import './style.scss';

const FilterPosition = observer(() => {
  const [select, setSelect] = useState('ALL');
  const { filterStore, transferMarketStore } = useContext(RootContext);
  const selectPosition = (event, type = 'ALL') => {
    switch (type) {
      case 'ALL':
        setSelect('ALL');
        break;
      case 'GK':
        setSelect('GK');
        break;
      case 'DF':
        setSelect('DF');
        break;
      case 'MD':
        setSelect('MD');
        break;
      case 'FW':
        setSelect('FW');
        break;
      default:
        return;
    }
    event.preventDefault();
    filterStore.selectPosition(type);
    transferMarketStore.filterByPosition();
  };

  return (
    <div className="Filter-by-position-container">
      <label className="label">
        <h3>select position</h3>
      </label>
      <div className="button--group select">
        <button
          onClick={(event) => selectPosition(event, 'ALL')}
          className={`btn`}
          aria-pressed={select === 'ALL'}
        >
          All
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'GK')}
          aria-pressed={select === 'GK'}
        >
          GK
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'DF')}
          aria-pressed={select === 'DF'}
        >
          DF
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'MD')}
          aria-pressed={select === 'MD'}
        >
          MD
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'FW')}
          aria-pressed={select === 'FW'}
        >
          FW
        </button>
      </div>
    </div>
  );
});
export default FilterPosition;
