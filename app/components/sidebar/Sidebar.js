// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { find, kebabCase } from 'lodash';
import classNames from 'classnames';
import styles from './Sidebar.scss';
import SidebarCategory from './SidebarCategory';
import SidebarWalletsMenu from './wallets/SidebarWalletsMenu';
import WalletAddDialog from '../../components/wallet/WalletAddDialog';
import type { SidebarWalletType } from '../../stores/SidebarStore';

type Props = {
  menus: {
    wallets: {
      items: Array<SidebarWalletType>,
      activeWalletId: ?string,
      actions: {
        onWalletItemClick: Function,
      }
    }
  },
  categories: Array<{
    name: string,
    route: string,
    icon: string,
  }>,
  plugins: Array<{
    name: string,
  }>,
  activeSidebarCategory: string,
  onCategoryClicked: Function,
  isShowingSubMenus: boolean,
  openDialogAction: Function,
};

@observer
export default class Sidebar extends Component<Props> {

  static defaultProps = {
    isShowingSubMenus: false,
  };

  onCategoryClicked(category: string, isPlugin?: boolean = false) {
    const { onCategoryClicked } = this.props;

    onCategoryClicked({ category, isPlugin });
  }

  render() {
    const {
      menus, categories, plugins, activeSidebarCategory,
      isShowingSubMenus,
      openDialogAction,
    } = this.props;
    let subMenu = null;

    const walletsCategory = find(categories, { name: 'WALLETS' }).route;
    if (menus && activeSidebarCategory === walletsCategory) {
      subMenu = (
        <SidebarWalletsMenu
          wallets={menus.wallets.items}
          onAddWallet={() => openDialogAction({
            dialog: WalletAddDialog,
          })}
          onWalletItemClick={menus.wallets.actions.onWalletItemClick}
          isActiveWallet={id => id === menus.wallets.activeWalletId}
          visible={isShowingSubMenus}
        />
      );
    }

    const sidebarStyles = classNames([
      styles.component,
      !isShowingSubMenus || subMenu == null ? styles.minimized : null
    ]);

    return (
      <div className={sidebarStyles}>
        <div className={styles.minimized}>
          {categories.map((category, index) => {
            const categoryClassName = kebabCase(category.name);
            return (
              <SidebarCategory
                key={index}
                className={categoryClassName}
                icon={category.icon}
                active={activeSidebarCategory === category.route}
                onClick={() => this.onCategoryClicked(category.route)}
              />
            );
          })}
          {plugins.map((plugin, index) => {
            const route = `plugins/${plugin.id}`;
            return (
              <SidebarCategory
                key={index}
                icon={plugin.icon}
                active={activeSidebarCategory === route}
                onClick={() => this.onCategoryClicked(route)}
                isPlugin
              />
            );
          })}
        </div>
        {subMenu}
      </div>
    );
  }

}
