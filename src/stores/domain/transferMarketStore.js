import { action, makeAutoObservable, observable } from 'mobx';
import { data } from '../../lib/data';
import * as values from '../../constants';
import { dynamicSort } from '../../helpers';

export default class TransferMarketStore {
  budget = values.TEAM_BUDGET;
  filterInstance = null;
  sortInstance = null;
  players = data.sort(dynamicSort('popularity', 'descending'));
  filterResult = null;
  message = '';
  compositionPlayer = null;
  totalCompositionByPositions = {
    GK: 0,
    DF: 0,
    MD: 0,
    FW: 0,
  };

  constructor(filter, sort) {
    this.filterInstance = filter;
    this.sortInstance = sort;
    makeAutoObservable(this, {
      players: observable,
      message: observable,
      filterResult: observable,
      compositionPlayer: observable,
      budget: observable,
      filterByPrice: action,
      filterByClub: action,
      filterByPosition: action,
      filterByName: action,
    });
  }

  filterByPrice = () => {
    let arr = [];
    const { min, max } = this.filterInstance.filter.filterByPrice;
    arr = this.pureFilter(arr, 'price', { min, max });
    this.filterResult = this.filterByAnotherField(arr, 'filterByPrice');
  };

  filterByClub = () => {
    const { club } = this.filterInstance.filter.filterByClub;
    let arr = [];
    if (this.filterResult?.length && club !== 'all club') {
      arr = this.pureFilter(arr, 'club', { club });
      this.filterResult = this.filterByAnotherField(arr, 'filterByClub');
      return;
    } else if ((!this.filterResult || this.filterResult?.length) && club === 'all club') {
      this.filterResult = this.players;
      return;
    } else if (club === 'all club') {
      this.filterResult = this.players;
      arr = [...this.filterResult];
      this.filterResult = this.filterByAnotherField(arr, 'filterByClub');
      return;
    }
    arr = this.pureFilter(arr, 'club', { club });
    this.filterResult = this.filterByAnotherField(arr, 'filterByClub');
  };

  filterByName = () => {
    const { query } = this.filterInstance.filter.filterByName;
    let arr = [];
    if (this.filterResult?.length && query.length) {
      arr = this.pureFilter(arr, 'name', { query });
      this.filterResult = this.filterByAnotherField(arr, 'filterByName');
      return;
    } else if ((!this.filterResult || this.filterResult?.length) && !query.length) {
      this.filterResult = this.players;
      return;
    } else if (!query.length) {
      this.filterResult = this.players;
      arr = [...this.filterResult];
      this.filterResult = this.filterByAnotherField(arr, 'filterByName');
      return;
    }
    arr = this.pureFilter(arr, 'name', { query });
    this.filterResult = this.filterByAnotherField(arr, 'filterByName');
  };

  filterByPosition = () => {
    const { position } = this.filterInstance.filter.filterByPosition;
    let arr = [];
    if (this.filterResult?.length && position !== 'ALL') {
      arr = this.pureFilter(arr, 'position', { position });
      this.filterResult = this.filterByAnotherField(arr, 'filterByPosition');
      return;
    } else if ((!this.filterResult || this.filterResult?.length) && position === 'ALL') {
      this.filterResult = this.players;
      return;
    } else if (position === 'ALL') {
      this.filterResult = this.players;
      arr = [...this.filterResult];
      this.filterResult = this.filterByAnotherField(arr, 'filterByPosition');
      return;
    }
    arr = this.pureFilter(arr, 'position', { position });
    this.filterResult = this.filterByAnotherField(arr, 'filterByPosition');
  };

  filterByAnotherField = (data, action) => {
    switch (action) {
      case 'filterByPrice': {
        const { club } = this.filterInstance.filter.filterByClub;
        const { query } = this.filterInstance.filter.filterByName;
        const { position } = this.filterInstance.filter.filterByPosition;

        if (club === 'all club' && !query.length && position === 'ALL') {
          return data;
        } else if (club === 'all club' && !query.length && position !== 'ALL') {
          return data.filter((player) => player.position === position);
        } else if (club === 'all club' && query.length && position === 'ALL') {
          return data.filter((player) => {
            const { firstName, lastName } = player;
            const fullName = `${firstName} ${lastName}`;
            return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
          });
        } else if (club === 'all club' && !query.length && position !== 'ALL') {
          return data
            .filter((player) => {
              const { firstName, lastName } = player;
              const fullName = `${firstName} ${lastName}`;
              return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
            })
            .filter((player) => player.position === position);
        } else if (club !== 'all club' && !query.length && position === 'ALL') {
          return data
            .filter((player) => player.club.trim() === club.trim())
            .filter((player) => {
              const { firstName, lastName } = player;
              const fullName = `${firstName} ${lastName}`;
              return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
            });
        } else if (club !== 'all club' && !query.length && position !== 'ALL') {
          return data
            .filter((player) => player.club.trim() === club.trim())
            .filter((player) => player.position === position);
        } else if (club !== 'all club' && query.length && position === 'ALL') {
          return data
            .filter((player) => player.club.trim() === club.trim())
            .filter((player) => {
              const { firstName, lastName } = player;
              const fullName = `${firstName} ${lastName}`;
              return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
            });
        }
        return data
          .filter((player) => player.club.trim() === club.trim())
          .filter((player) => {
            const { firstName, lastName } = player;
            const fullName = `${firstName} ${lastName}`;
            return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
          })
          .filter((player) => player.position === position);
      }
      case 'filterByClub': {
        const { min, max } = this.filterInstance.filter.filterByPrice;
        const { query } = this.filterInstance.filter.filterByName;
        const { position } = this.filterInstance.filter.filterByPosition;
        if (!query.length && position === 'ALL') {
          return data.filter(
            (player) =>
              parseInt(player.price) >= parseInt(min) && parseInt(player.price) <= parseInt(max),
          );
        } else if (!query.length && position !== 'ALL') {
          return data
            .filter(
              (player) => parseInt(player.price) >= parseInt(min) && player.price <= parseInt(max),
            )
            .filter((player) => player.position === position);
        } else if (query.length && position === 'ALL') {
          return data
            .filter((player) => {
              const { firstName, lastName } = player;
              const fullName = `${firstName} ${lastName}`;
              return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
            })
            .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max));
        }
        return data
          .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
          .filter((player) => player.position === position)
          .filter((player) => {
            const { firstName, lastName } = player;
            const fullName = `${firstName} ${lastName}`;
            return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
          });
      }

      case 'filterByName': {
        const { club } = this.filterInstance.filter.filterByClub;
        const { min, max } = this.filterInstance.filter.filterByPrice;
        const { position } = this.filterInstance.filter.filterByPosition;

        if (club === 'all club' && position === 'ALL') {
          return data.filter(
            (player) => player.price >= parseInt(min) && player.price <= parseInt(max),
          );
        } else if (club === 'all club' && position !== 'ALL') {
          return data
            .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
            .filter((player) => player.position === position);
        } else if (club !== 'all club' && position === 'ALL') {
          return data
            .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
            .filter((player) => player.club.trim() === club.trim());
        }
        return data
          .filter((player) => player.club.trim() === club.trim())
          .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
          .filter((player) => player.position === position);
      }
      case 'filterByPosition': {
        const { club } = this.filterInstance.filter.filterByClub;
        const { min, max } = this.filterInstance.filter.filterByPrice;
        const { query } = this.filterInstance.filter.filterByName;
        if (club === 'all club' && !query.length) {
          return data.filter(
            (player) => player.price >= parseInt(min) && player.price <= parseInt(max),
          );
        } else if (club === 'all club' && !query.length) {
          return data
            .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
            .filter((player) => {
              const { firstName, lastName } = player;
              const fullName = `${firstName} ${lastName}`;
              return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
            });
        } else if (club !== 'all club' && !query.length) {
          return data
            .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
            .filter((player) => player.club.trim() === club.trim());
        }
        return data
          .filter((player) => player.price >= parseInt(min) && player.price <= parseInt(max))
          .filter((player) => player.club.trim() === club.trim())
          .filter((player) => {
            const { firstName, lastName } = player;
            const fullName = `${firstName} ${lastName}`;
            return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
          });
      }
      default:
        return;
    }
  };

  orderBy = ({ column = 'popularity', order = 'descending' }) => {
    if (this.filterResult || this.filterResult?.length) {
      const arr = [...this.filterResult];
      this.filterResult = arr.sort(dynamicSort('popularity', order));
    } else {
      const copyData = [...this.players];
      this.players = copyData.sort(dynamicSort(column, order));
    }
  };

  buyPlayer = (id) => {
    this.message = '';
    const player = data.find((item) => item.id === id);
    const { price, position } = player;
    let item = null,
      idx = null;
    if (!this.compositionPlayer) {
      this.compositionPlayer = {};
    } else {
      let total = 0;
      for (const [key, value] of Object.entries(this.compositionPlayer)) {
        total += value.price;
      }
      if (this.totalCompositionByPositions[position] === 4) {
        this.message = 'Maximum 4 players per position';
        return;
      } else if (total + price > values.TEAM_BUDGET) {
        this.message = 'There is not enough budget';
        return;
      }
    }
    this.totalCompositionByPositions[position] += 1;

    this.compositionPlayer[id] = {
      price,
      position,
    };
    if (this.filterResult) {
      item = this.filterResult.find((player) => player.id === id);
      idx = this.filterResult.findIndex((player) => player.id === id);
      item = { ...item, ...{ inLineup: true } };
      this.filterResult[idx] = item;
    } else {
      item = this.players.find((player) => player.id === id);
      idx = this.players.findIndex((player) => player.id === id);
      item = { ...item, ...{ inLineup: true } };
      this.players[idx] = item;
    }
    this.budget -= this.compositionPlayer[id].price;
  };

  pureFilter = (arr = [], action, values = {}) => {
    switch (action) {
      case 'name': {
        const { query } = values;
        this.filterResult = this.players.filter((player) => {
          const { firstName, lastName } = player;
          const fullName = `${firstName} ${lastName}`;
          return fullName.trim().toLocaleLowerCase().includes(query.trim().toLowerCase());
        });
        arr = [...this.filterResult];
        return arr;
      }
      case 'position': {
        const { position } = values;
        this.filterResult = this.players.filter((player) => player.position === position);
        arr = [...this.filterResult];
        return arr;
      }
      case 'club': {
        const { club } = values;
        this.filterResult = this.players.filter((player) => player.club.trim() === club.trim());
        arr = [...this.filterResult];
        return arr;
      }
      case 'price': {
        const { min, max } = values;
        this.filterResult = this.players.filter(
          (player) =>
            parseInt(player.price) >= parseInt(min) && parseInt(player.price) <= parseInt(max),
        );
        arr = [...this.filterResult];
        return arr;
      }
      default:
        return;
    }
  };
}
