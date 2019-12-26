import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  isAuthenticated: false,
  newUser: null,
  menuVisible: false,
  navItems: getSidebarNavItems()
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.setNewUser = this.setNewUser.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSidebarDropdown = this.toggleSidebarDropdown.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.USER_AUTHENTICATION:
        this.userHasAuthenticated();
        break;
      case Constants.NEW_USER:
        this.setNewUser(payload);
        break;
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.TOGGLE_SIDEBAR_DROPDOWN:
        this.toggleSidebarDropdown(payload);
        break;
      default:
    }
  }

  userHasAuthenticated() {
    _store.isAuthenticated = !_store.isAuthenticated;
  }

  setNewUser(newUser) {
    _store.newUser = newUser;
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  toggleSidebarDropdown(item) {
    const newStore = { ..._store };

    let navGroupIdx = null;
    let navItemIdx = null;

    newStore.navItems.forEach((navItem, _idx) => {
      const __idx = navItem.items.indexOf(item);
      if (__idx !== -1) {
        navGroupIdx = _idx;
        navItemIdx = __idx;
      }
    });

    newStore.navItems[navGroupIdx].items[navItemIdx].open = !newStore.navItems[
      navGroupIdx
    ].items[navItemIdx].open;

    newStore.navItems = newStore.navItems.map(i => {
      i.items = i.items.map((_i, idx) => {
        if (idx !== navItemIdx) {
          _i.open = false;
        }
        return _i;
      });
      return i;
    });

    _store = newStore;
    this.emit(Constants.CHANGE);
  }

  isAuthenticated() {
    return _store.isAuthenticated;
  }

  newUser() {
    return _store.newUser;
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
