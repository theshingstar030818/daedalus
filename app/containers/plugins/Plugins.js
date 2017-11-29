import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';
// import SettingsLayout from '../../components/settings/SettingsLayout';
import resolver from '../../utils/imports';
// import { buildRoute } from '../../utils/routing';
// import type { InjectedContainerProps } from '../../types/injectedPropsType';

const Layout = resolver('containers/MainLayout');

// @inject('stores', 'actions') @observer
export default class Settings extends Component {

  // static defaultProps = { actions: null, stores: null };

  render() {
    return (
      <Layout />
    );
  }
}
