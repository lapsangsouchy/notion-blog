import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { getCookie, setCookie } from 'cookies-next';

const links = [
  {
    link: '/about',
    label: 'Home',
  },
  {
    link: '/learn',
    label: 'Features',
  },
  {
    link: '/pricing',
    label: 'Pricing',
  },
];

export default function App({
  Component,
  pageProps,
}: AppProps & { colorScheme: ColorScheme }) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'none',
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
        <Layout links={links} />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
