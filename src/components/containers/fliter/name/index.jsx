import { useState, useContext } from 'react';
import { Modal, FormSelectPlayer } from '../../../index';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../../../contexts';

import './style.scss';

const FilterName = observer(() => {
  const { filterStore, transferMarketStore } = useContext(RootContext);

  const [isModalSelectFilterNameOpen, setIsModalSelectFilterNameOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalSelectFilterNameOpen(false);
    transferMarketStore.filterByName();
  };
  return (
    <>
      <div className="Filter-by-name-container">
        <label className="label">
          <h3>select player</h3>
        </label>
        <div className="btn-select-club select" onClick={() => setIsModalSelectFilterNameOpen(true)}>
          <div className="select-with-arrow">
            <h3 className="full-name">
              {filterStore.filter.filterByName.query === '' ? 'all player' : filterStore.filter.filterByName.query}
            </h3>
            <div className="img-wrapper">
              <img className="arrow-img" src={'/assets/images/arrow-comment.png'} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      {isModalSelectFilterNameOpen && (
        <Modal visible={isModalSelectFilterNameOpen} onClose={handleCloseModal}>
          <div className="wrapper-content-modal">
            <FormSelectPlayer onClose={handleCloseModal} />
          </div>
        </Modal>
      )}
    </>
  );
});
export default FilterName;
