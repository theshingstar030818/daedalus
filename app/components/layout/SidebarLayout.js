// @flow
import React, { Component } from 'react';
import type { Children, Element } from 'react';
import { observer } from 'mobx-react';
import styles from './SidebarLayout.scss';

@observer
export default class SidebarLayout extends Component {

  static defaultProps = { children: null };

  props: {
    children: any | Children,
    sidebar: Element<any>,
    topbar: Element<any>,
    notification?: ?Element<any>,
    contentDialog?: ?Element<any>,
  };

  webview = null;

  componentDidMount() {
    setTimeout(() => {
      if (this.webview !== null) {
        this.webview.addEventListener('ipc-message', (event) => {
          console.log(event.channel);
        });
        this.webview.send('ping');
      }
    }, 1000);
  }

  render() {
    const { children, sidebar, topbar, notification, contentDialog } = this.props;
    return (
      <div className={styles.component}>
        <div className={styles.sidebar}>
          {sidebar}
        </div>
        <div className={styles.main}>
          <div className={styles.topbar}>
            {topbar}
          </div>
          {notification}
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <webview
                ref={(element) => this.webview = element}
                src="/Users/dominik/Downloads/test/index.html"
                className={styles.webview}
                preload="/Users/dominik/work/clients/input-output/daedalus/daedalus/app/preload.js"
              />
              {children}
            </div>
            {contentDialog}
          </div>
        </div>
      </div>
    );
  }
}
