import { useState, useContext, useEffect } from 'react';
import { RootContext } from '../../../../contexts';
import { observer } from 'mobx-react-lite';

const HeaderTable = observer(() => {
  const { sortStore, transferMarketStore } = useContext(RootContext);

  const [sorting, setSorting] = useState({
    column: 'popularity',
    order: 'descending',
  });

  useEffect(() => {
    sortStore.updateSortingState(sorting);
    transferMarketStore.orderBy(sorting);
  }, [sorting]);

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
      case 'firstName':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'firstName',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'firstName',
              order: 'descending',
            };
          }
        });
        break;
      case 'points':
        setSorting((prevState) => {
          if (prevState.order === 'descending') {
            return {
              column: 'points',
              order: 'ascending',
            };
          } else if (prevState.order === 'ascending') {
            return {
              column: 'points',
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
            className={sorting.column === 'firstName' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'firstName')}
          >
            <span>player name</span>
            <img src={'/assets/images/arrow_down.png'} alt={'arrow'} />
          </div>
          <div
            className={sorting.column === 'points' ? `t-btn ${sorting.order}` : `t-btn`}
            onClick={(event) => handleClick(event, 'points')}
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
