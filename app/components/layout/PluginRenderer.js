// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './PluginRenderer.scss';

type Props = {
  plugins: Array<any>,
  activeId: boolean,
};

@observer
export default class PluginRenderer extends Component<Props> {
  render() {
    const { plugins, activeId } = this.props;

    return (
      <div
        className={classNames([
          styles.component,
          activeId ? styles.renderItems : null,
        ])}
      >
        {plugins.map(plugin => (
          <div
            key={plugin.name}
            className={classNames([
              styles.webviewContainer,
              plugin.id === activeId ? styles.isActive : null,
            ])}
          >
            <webview
              src={`file://${plugin.main}`}
              partition={`plugin-${plugin.name}`}
            />
          </div>
        ))}
      </div>
    );
  }
}
