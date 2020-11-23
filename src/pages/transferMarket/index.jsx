import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterContainer, PlayerTable } from '../../components/containers';
import { Header, Budget } from '../../components';
import { RootContext } from '../../contexts';
import './style.scss';

const TransferMarketStore = observer(() => {
  const { transferMarketStore } = useContext(RootContext);
  return (
    <div className="TransferMarket-wrapper">
      <Header title="Transfer market" />
      <Budget transfer={transferMarketStore.budget} coins={`404730`} points={'966'} />
      <hr className="hr" />
      <FilterContainer />
      <PlayerTable />
    </div>
  );
});
export default TransferMarketStore;
