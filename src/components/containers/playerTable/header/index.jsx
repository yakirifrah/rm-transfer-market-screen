import { useState, useContext } from 'react';
import { RootContext } from '../../../../contexts';
import { observer } from 'mobx-react-lite';

const HeaderTable = observer(() => {
  const { sortStore, transferMarketStore } = useContext(RootContext);

  const [sorting, setSorting] = useState({
    column: 'popularity',
    order: 'descending',
  });

  const handleClick = (event, type = 'popularity') => {
    switch (type) {
      case 'popularity':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'popularity',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'popularity',
              order: 'descending',
            };
          }
        });
        break;
      case 'player':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'player',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'player',
              order: 'descending',
            };
          }
        });
        break;
      case 'point':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'point',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'point',
              order: 'descending',
            };
          }
        });
        break;
      case 'price':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'price',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'price',
              order: 'descending',
            };
          }
        });
        break;
      default:
        return;
    }
    sortStore.updateSortingState(sorting);
    transferMarketStore.orderBy(sorting.column, sorting.order);
  };
  return (
    <div className="t-header">
      <div className="t-header-wrapper">
        <div className="t-header-wrapper__button-group">
          <div
            className={sorting.column === 'popularity' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'popularity')}
          >
            <span>popularity</span>
            <img src={'/assets/images/arrow_down.png'} alt={'arrow'} />
          </div>
          <div
            className={sorting.column === 'player' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'player')}
          >
            <span>player name</span>
            <img src={'/assets/images/arrow_down.png'} alt={'arrow'} />
          </div>
          <div
            className={sorting.column === 'point' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'point')}
          >
            <span>points</span>
            <img src={'/assets/images/arrow_down.png'} alt={'arrow'} />
          </div>
          <div
            className={sorting.column === 'price' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'price')}
          >
            <span>price</span>
            <img src={'/assets/images/arrow_down.png'} alt={'arrow'} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeaderTable;
