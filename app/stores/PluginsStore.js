import { remote } from 'electron';
import path from 'path';
import { computed } from 'mobx';

import Store from './lib/Store';

const { app } = remote;

export default class PluginsStore extends Store {
  testPlugins = [
    'test1',
    'test2',
  ];

  setup() {
    console.log('Plugin Store init');
  }

  @computed get all(): Array<any> {
    return this.testPlugins.map(p => ({
      name: p,
      path: this._buildPluginPath(p),
    }));
  }

  // Helpers
  _buildPluginPath(plugin): string {
    return path.join(app.getPath('userData'), 'Plugins', plugin);
  }
}
