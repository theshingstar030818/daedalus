import { remote } from 'electron';
import path from 'path';
import { computed } from 'mobx';
import RouteParser from 'route-parser';

import Store from './lib/Store';
import { ROUTES } from '../routes-config';

const { app } = remote;

/*
TODO:
  - [ ] load plugins dynamically
  - [ ] parse config file
*/

export default class PluginsStore extends Store {
  testPlugins = [
    'test1',
    'test2',
  ];

  @computed get activePluginId() {
    const match = new RouteParser(ROUTES.PLUGINS).match(this.stores.router.location.pathname);

    if (match && Object.prototype.hasOwnProperty.call(match, 'id')) {
      return match.id;
    }
  }

  @computed get all(): Array<any> {
    return this.testPlugins.map((p) => {
      const pluginPath = this._buildPluginPath(p);
      return {
        name: p,
        id: `plugin-${p}`,
        path: pluginPath,
        main: path.join(pluginPath, 'index.html'),
        icon: path.join(pluginPath, 'icon.svg'),
      };
    });
  }

  // @computed get active() {
  //   return this.get(this.activePluginId);
  // }

  // get(id) {
  //   return this.all.find(p => p.id === id);
  // }

  // Helpers
  _buildPluginPath(plugin): string {
    return path.join(app.getPath('userData'), 'Plugins', plugin);
  }
}
