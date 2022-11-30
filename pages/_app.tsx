import { useState } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import NextApp, { AppProps, AppContext } from 'next/app';
import Layout from '../components/layout/Layout';
import { getCookie, setCookie } from 'cookies-next';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'none',
      secure: true,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,

          globalStyles: (theme) => ({
            a: {
              color: '#2563eb',
              textDecoration: 'none',
            },
          }),
        }}
      >
        <Layout />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  // get color scheme from cookie
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
