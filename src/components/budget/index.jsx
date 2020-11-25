import './style.scss';

export default function Budget(props) {
  let { transfer, coins, points } = props;
  transfer = transfer % 1000000 === 0 ? transfer / 1000000 + 'M' : parseFloat(transfer / 1000000).toFixed(1) + 'M';
  coins = coins % 1000 === 0 ? coins / 1000 + 'K' : parseFloat(coins / 1000).toFixed(2) + 'K';
  return (
    <div className="Budget-wrapper">
      <div className="Budget-wrapper__icons">
        <div className="transfer icon">
          <div className="transfer title">
            <h3>{transfer}</h3>
          </div>
          <div className="image">
            <img src={'/assets/images/transfer.png'} alt="transfer" />
          </div>
        </div>
        <div className="coins icon">
          <div className="coins title">
            <h3>{coins}</h3>
          </div>
          <div className="image">
            <img src={'/assets/images/budget.png'} alt="coins" />
          </div>
        </div>
        <div className="points icon">
          <div className="points title">
            <h3>{points}</h3>
          </div>
          <div className="image">
            <img src={'/assets/images/token.png'} alt="points" />
          </div>
        </div>
      </div>
    </div>
  );
}
