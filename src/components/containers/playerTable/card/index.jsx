import {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {RootContext} from '../../../../contexts';
import {loggerMobx} from "../../../../helpers";
import './style.scss';
import Modal from "../../../modal";
import MessageCard from "../../../messageCard";


const CardPlayer = observer(({playerDetail}) => {
    const {
        id,
        imgUrl,
        firstName,
        lastName,
        popularity,
        score,
        price,
        position,
        imgClub,
        inLineup = false,
    } = playerDetail;
    const {transferMarketStore} = useContext(RootContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const convertPrice =
        price % 1000000 === 0 ? price / 1000000 + 'm' : parseFloat(price / 1000000).toFixed(1) + 'm';

    const onClose = () => {
        setIsModalOpen(false)
    }
    const handleOnClick = () => {
        transferMarketStore.buyPlayer(id);
        if (transferMarketStore.message.length) {
            console.log('modal');
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
                        <img src={imgUrl} alt={firstName}/>
                        <span className="position">{position}</span>
                    </div>
                    <div className="popularity">{popularity}%</div>
                    <div className="full-name">
                        <div>
                            {firstName} {lastName}
                        </div>
                    </div>
                    <div className="score">
                        <b>{score}</b>
                    </div>
                    {inLineup ? (
                        <div className="price">
                            <button className="btn" onClick={handleOnClick}
                                    disabled={true}>
                                {`in a team`}
                            </button>
                        </div>

                    ) : (
                        <div className="price">
                            <button className="btn" onClick={handleOnClick}
                            >
                                {convertPrice}
                            </button>
                        </div>
                    )}

                </div>
            </div>
            {isModalOpen && (
                <Modal
                    visible={isModalOpen}
                    onClose={onClose}

                >
                    <MessageCard
                        msg={transferMarketStore.message}

                    />
                </Modal>
            )}
        </>
    );
});
export default CardPlayer;
