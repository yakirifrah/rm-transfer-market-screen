import { makeAutoObservable } from 'mobx';
import { FilterStore, TransferMarketStore, SortStore } from './domain';

export class GlobalStore {
  constructor() {
    makeAutoObservable(this);
    this.filterStore = new FilterStore(this);
    this.sortStore = new SortStore(this);
    this.transferMarketStore = new TransferMarketStore(this.filterStore, this.sortStore);
  }
}
