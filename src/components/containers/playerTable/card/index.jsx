import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../../../contexts';
import { Modal, MessageCard } from '../../../index';
import './style.scss';

const CardPlayer = observer(({ playerDetail }) => {
  const {
    id,
    imgUrl,
    firstName,
    lastName,
    popularity,
    points,
    price,
    position,
    imgClub,
    inLineup = false,
  } = playerDetail;
  const { transferMarketStore } = useContext(RootContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const convertPrice = price % 1000000 === 0 ? price / 1000000 + 'm' : parseFloat(price / 1000000).toFixed(1) + 'm';

  const onClose = () => {
    setIsModalOpen(false);
  };
  const handleOnClick = () => {
    transferMarketStore.buyPlayer(id);
    if (transferMarketStore.message.length) {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <div className="CardPlayer">
        <div className="player-info">
          <div
            className="player-avatar"
            style={{
              backgroundImage: `url(${imgClub})`,
              height: '45px',
              zIndex: '100',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img src={imgUrl} alt={firstName} />
            <span className="position ml-3">{position}</span>
          </div>
          <div className="popularity ml-3">{popularity}%</div>
          <div className="name">
            <div>
              {firstName} {lastName}
            </div>
          </div>
          <div className="points ml-3">
            <b>{points}</b>
          </div>
          {inLineup ? (
            <div className="price ml-3">
              <button className="btn" onClick={handleOnClick} disabled={true}>
                {`lineup`}
              </button>
            </div>
          ) : (
            <div className="price ml-3">
              <button className="btn" onClick={handleOnClick}>
                {convertPrice}
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal visible={isModalOpen} onClose={onClose}>
          <MessageCard msg={transferMarketStore.message} />
        </Modal>
      )}
    </>
  );
});
export default CardPlayer;
