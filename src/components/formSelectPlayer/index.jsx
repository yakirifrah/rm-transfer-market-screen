import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RootContext } from '../../contexts';
import './style.scss';

const FormSelectPlayer = observer((props) => {
  const { onClose } = props;
  const { filterStore } = useContext(RootContext);
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    filterStore.selectName(name);
    onClose();
  };
  const resetFieldInput = (event) => {
    event.preventDefault();
    setName('');
    filterStore.resetFieldName();
    onClose();
  };
  return (
    <form className="form--wrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={filterStore.filter.filterByName.query || name}
        placeholder={'Player name'}
        className="input-name"
        onChange={({ target }) => setName(target.value)}
      />
      <div className="btn-group">
        <button type="submit" className="btn-search btn">
          search
        </button>
        <button className="btn-reset btn" onClick={resetFieldInput}>
          reset search
        </button>
      </div>
    </form>
  );
});
export default FormSelectPlayer;
