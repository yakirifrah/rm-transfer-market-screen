import './style.scss';
import HeaderTable from './header';
import ContentTable from './table';

const PlayerTable = () => {
  return (
    <div className="PlayerTable">
      <label className="label">
        <h3 className="sorted-title">sorted by</h3>
      </label>
      <HeaderTable />
      <ContentTable />
    </div>
  );
};

export default PlayerTable;
