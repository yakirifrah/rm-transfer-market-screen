import { action, makeAutoObservable, observable } from 'mobx';

export default class FilterStore {
  filter = {
    filterByPosition: {
      position: 'ALL',
    },
    filterByPrice: {
      min: 0,
      max: 20000000,
    },
    filterByClub: {
      club: 'all club',
      imageUrl: '/assets/club/all-club.png',
    },
    filterByName: {
      query: '',
    },
  };

  constructor() {
    makeAutoObservable(this, {
      filter: observable,
      selectPosition: action,
      selectPrice: action,
      selectClub: action,
      selectName: action,
      resetFieldName: action,
    });
  }

  selectPosition = (position) => {
    this.filter.filterByPosition.position = position;
  };
  selectPrice = ({ min, max }) => {
    this.filter.filterByPrice.min = min;
    this.filter.filterByPrice.max = max;
  };
  selectClub = ({ club, imageUrl }) => {
    this.filter.filterByClub.club = club;
    this.filter.filterByClub.imageUrl = imageUrl;
  };
  selectName = (name) => {
    this.filter.filterByName.query = name;
  };
  resetFieldName = () => {
    this.filter.filterByName.query = '';
  };
}
