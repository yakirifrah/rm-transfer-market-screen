import { useContext } from 'react';
import { RootContext } from '../../../../contexts';
import { observer } from 'mobx-react-lite';
import CardPlayer from '../card';

import './style.scss';

const Table = observer(() => {
  const { transferMarketStore } = useContext(RootContext);
  const data = transferMarketStore.filterResult || transferMarketStore.players;
  return (
    <div className="TableContent">
      {data.map((playerDetail) => {
        return <CardPlayer key={playerDetail.id} playerDetail={playerDetail} />;
      })}
    </div>
  );
});

export default Table;
