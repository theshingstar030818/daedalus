import { remote } from 'electron';
import path from 'path';
import { computed } from 'mobx';
import RouteParser from 'route-parser';

import fs from 'fs';

import Store from './lib/Store';
import { ROUTES } from '../routes-config';

const { app } = remote;

/*
TODO:
  - [ ] load plugins dynamically
  - [ ] parse config file
*/

const rootPath = path.join(app.getPath('userData'), 'Plugins');

export default class PluginsStore extends Store {
  testPlugins = [
    'test1',
    'test2',
    'test3',
  ];

  @computed get activePluginId() {
    const match = new RouteParser(ROUTES.PLUGINS).match(this.stores.router.location.pathname);

    if (match && Object.prototype.hasOwnProperty.call(match, 'id')) {
      return match.id;
    }
  }

  @computed get all(): Array<any> {
    // TODO: all of this should be done by a plugin API
    return this.testPlugins.map((p) => {
      const plugin = this._loadManifest(p);

      if (plugin) return plugin;

      return null;
    }).filter(p => p !== null);
  }

  // Helpers
  _buildPluginPath(id): string {
    return path.join(rootPath, id);
  }

  _loadManifest(id) {
    // TODO: all of this should be done by a plugin API
    try {
      const pluginPath = this._buildPluginPath(id);
      const rawFileContent = fs.readFileSync(path.join(pluginPath, 'manifest.json'));
      const config = JSON.parse(rawFileContent);

      // TODO: add manifest validation
      return Object.assign(config, {
        path: pluginPath,
        main: path.join(pluginPath, config.main),
        icon: path.join(pluginPath, 'icon.svg'),
      });
    } catch (err) {
      console.error('PluginStore::loadManifest failed for ', id, err);
    }

    return false;
  }
}
