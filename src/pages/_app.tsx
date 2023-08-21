import '../styles/globals.css';
import Image from 'next/image';
import type { AppProps } from 'next/app'
import { ThemeProvider, GlobalStyle, List } from '@react95/core';
import { FilePencil, HtmlPage, Notepad, computer3Data } from '@react95/icons';
import Head from 'next/head';
import MainTaskBar from '../components/MainTaskBar';
import { useEffect, useReducer } from 'react';
import { WindowContext } from '../components/WindowContext';
import { createWindowStack, windowStackReducer, WindowStack } from '../components/WindowStack';
import IEModal from '../components/IEModal';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import Icon from '../components/Icon';

const CustomGlobalStyle = createGlobalStyle`
  body {
    user-select: none;
    background-color: #000
  }

  img {
    pointer-events: none;
  }
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [windows, dispatch] = useReducer(windowStackReducer, createWindowStack());
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'UPDATE_WINDOW', id: 'IE_WINDOW', props: {
      width: 1000,
      title: `${window.location.href} - Microsoft Internet Explorer`,
      icon: <HtmlPage />,
      menu: [
        {
          name: 'File',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
        {
          name: 'Edit',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
        {
          name: 'View',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
        {
          name: 'Go',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
        {
          name: 'Favorites',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
        {
          name: 'Help',
          list: (
            <List>
              <List.Item>Filler</List.Item>
            </List>
          ),
        },
      ]
    },
    element: () => {
      return (
        <IEModal>
          <Component {...pageProps} />
        </IEModal>
      )
  }})
  }, [Component, pageProps]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>blog.hat.fo</title>
        <meta content="blog.hat.fo" property="og:site_name" />
        <meta content="blog.hat.fo" property="og:title" />
        <meta content="Harrison Ford (hatf0)'s blog" property="og:description" />
        <meta content="object" property="og:type" />
        <meta content="https://blog.hat.fo" property="og:url" />
        <meta content="#37474f" data-react-helmet="true" name="theme-color" />
        <link rel='icon' type='image/x-icon' href={computer3Data['32x32_4'].imageSrc} />
      </Head>
      <ThemeProvider>
        <GlobalStyle />
        <CustomGlobalStyle />
        <div className="fixed w-full h-full z-0">
          <Image
            src='/win_setup_img.png'
            fill={true}
            alt='The Windows 95 Setup image'
            />
        </div>
        <div className="fixed z-10 overflow-hidden">
          <WindowContext.Provider value={{ stack: windows, dispatch }}>
            <WindowStack windows={windows} />
            <div className="flex flex-col items-start">
              <Icon.Wrapper onDoubleClick={(e) => router.push('/posts/welcome')}>
                <Icon.Box>
                  <FilePencil variant='32x32_4' />
                  <Icon.Text>
                    welcome.txt
                  </Icon.Text>
                </Icon.Box>
              </Icon.Wrapper>
            </div>
            <MainTaskBar />
          </WindowContext.Provider>
        </div>
      </ThemeProvider>
    </>
  );
}