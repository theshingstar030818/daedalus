// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import styles from './SidebarCategory.scss';

type Props = {
  icon: string,
  active: boolean,
  onClick: Function,
  className?: string,
  isPlugin?: boolean,
};

@observer
export default class SidebarCategory extends Component<Props> {
  render() {
    const { icon, active, onClick, className, isPlugin } = this.props;

    const componentStyles = classNames([
      styles.component,
      active ? styles.active : null,
      className,
      isPlugin ? styles.isPlugin : null,
    ]);

    return (
      <button className={componentStyles} onClick={onClick}>
        {!isPlugin ? (
          <SvgInline svg={icon} className={styles.icon} />
        ) : (
          <span
            style={{ backgroundImage: `url('${icon}')` }}
            className={styles.icon}
          />
        )}
      </button>
    );
  }

}
