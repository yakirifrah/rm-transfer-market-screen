import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../../../contexts';
import './style.scss';

const FilterRole = observer(() => {
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
    }
    event.preventDefault();
    filterStore.selectPosition(type);
    transferMarketStore.filterByPosition();
  };

  return (
    <div className="Filter-by-role-container">
      <label className="label">
        <h3>select position</h3>
      </label>
      <div className="button--group select">
        <button
          onClick={(event) => selectPosition(event, 'ALL')}
          className={`btn`}
          aria-checked={select === 'ALL'}
        >
          All
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'GK')}
          aria-checked={select === 'GK'}
        >
          GK
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'DF')}
          aria-checked={select === 'DF'}
        >
          DF
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'MD')}
          aria-checked={select === 'MD'}
        >
          MD
        </button>
        <button
          className={`btn`}
          onClick={(event) => selectPosition(event, 'FW')}
          aria-checked={select === 'FW'}
        >
          FW
        </button>
      </div>
    </div>
  );
});
export default FilterRole;
