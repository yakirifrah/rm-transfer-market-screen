import './style.scss';
import { club } from '../../lib/club';
import ClubItem from './ClubItem';

export default function ListClub(props) {
  const { onClose } = props;
  return (
    <div className="ListClub">
      <div className="ListClub__header-wrapper">
        <span className="header">select club</span>
      </div>
      {club.map((item) => {
        const { id, club, imageUrl } = item;
        return <ClubItem club={club} key={id} imageUrl={imageUrl} onClose={onClose} />;
      })}
    </div>
  );
}
