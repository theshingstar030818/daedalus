// @flow
import React, { Component } from 'react';
// import type { Node } from 'react';
import { observer } from 'mobx-react';
// import styles from './SidebarLayout.scss';

type Props = {
  plugins: Array<any>
  // children: any | Node,
  // sidebar: Node,
  // topbar: Node,
  // notification?: ?Node,
  // contentDialog?: ?Node,
};

@observer
export default class PluginRenderer extends Component<Props> {

  // static defaultProps = {
  //   children: null
  // };

  render() {
    const { plugins } = this.props;
    console.log(plugins);
    return (
      <div>
        {/* {plugins.map(plugin => (
          <Webview
            src={plugin.path}
          />
        ))} */}
        Hello World
      </div>
    );
  }
}
