import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import { SnackbarProvider } from 'notistack';

import ShopProvider from '../components/Context/Shop/ShopProvider'
import ListProvider from '../components/Context/List/ListProvider'
import NavigationProvider from '../components/Context/Navigation/NavigationProvider'
import HandlesProvider from '../components/Context/Handles/HandlesProvider'
import LoadingProvider from '../components/Context/Loading/LoadingProvider'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Shelfie Master</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline/>
          <ApolloProvider client={client}>
            <SnackbarProvider maxSnack={3}>
              <NavigationProvider>
                <HandlesProvider>
                  <ShopProvider>
                    <ListProvider>
                      <LoadingProvider>
                        <Component {...pageProps} />
                      </LoadingProvider>
                    </ListProvider>
                  </ShopProvider>
                </HandlesProvider>
              </NavigationProvider>
            </SnackbarProvider>
          </ApolloProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
