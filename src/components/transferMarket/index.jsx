import {useContext} from 'react';

import FilterContainer from '../containers/fliter';
import Budget from '../budget';
import Header from '../header';
import PlayerTable from '../containers/playerTable';
import {observer} from 'mobx-react-lite';
import {RootContext} from "../../contexts";
import './style.scss';

const TransferMarketStore = observer(() => {
    const {transferMarketStore} = useContext(RootContext);
    return (
        <div className="TransferMarket-wrapper">
            <Header title="Transfer market"/>
            <Budget transfer={transferMarketStore.budget} coins={`404730`} points={'966'}/>
            <hr className="hr"/>
            <FilterContainer/>
            <PlayerTable/>
        </div>
    );
})
export default TransferMarketStore;
