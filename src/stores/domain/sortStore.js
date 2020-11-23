import { action, makeAutoObservable, observable, computed } from 'mobx';

export default class SortStore {
  sorting = {
    column: 'popularity',
    order: 'descending',
  };

  constructor() {
    makeAutoObservable(this, {
      sorting: observable,
    });
  }

  updateSortingState = ({ column, order }) => {
    this.sorting.column = column;
    this.sorting.order = order;
  };
}
