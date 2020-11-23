import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../contexts';
import './style.scss';

const ClubItem = observer((props) => {
  const { filterStore } = useContext(RootContext);
  const { club, imageUrl, onClose } = props;
  const handleClick = () => {
    filterStore.selectClub({ club, imageUrl });
    onClose();
  };
  return (
    <div className="ClubItem">
      <div className="item" onClick={() => handleClick(club)}>
        <img src={imageUrl} alt="all-club" />
        <span>{club}</span>
      </div>
    </div>
  );
});
export default ClubItem;
