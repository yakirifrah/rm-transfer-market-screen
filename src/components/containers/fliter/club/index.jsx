import { useState, useContext } from 'react';
import Modal from '../../../modal';
import ListClub from '../../../listClub';
import { RootContext } from '../../../../contexts';
import { observer } from 'mobx-react-lite';

import './style.scss';

const FilterClub = observer(() => {
  const [isModalSelectClubOpen, setIsModalSelectClubOpen] = useState(false);
  const { filterStore, transferMarketStore } = useContext(RootContext);
  const handleOnClose = () => {
    setIsModalSelectClubOpen(false);
    transferMarketStore.filterByClub();
  };
  return (
    <>
      <div className="Filter-by-club-container">
        <label className="label">
          <h3>select club</h3>
        </label>
        <div className="btn-select-club select" onClick={() => setIsModalSelectClubOpen(true)}>
          <div className="select-with-arrow">
            <img src={filterStore.filter.filterByClub.imageUrl} alt={'club'} />
            <h3 className="club-name">{filterStore.filter.filterByClub.club || 'all club'}</h3>
            <div className="img-wrapper">
              <img className="arrow-img" src={'/assets/images/arrow-comment.png'} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      {isModalSelectClubOpen && (
        <Modal visible={isModalSelectClubOpen} onClose={handleOnClose}>
          <ListClub onClose={handleOnClose} />
        </Modal>
      )}
    </>
  );
});
export default FilterClub;
