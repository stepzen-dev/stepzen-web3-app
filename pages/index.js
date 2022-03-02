import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import detectEthereumProvider from '@metamask/detect-provider';

export default function Home() {
  const [provider, setProvider] = useState('');
  const [publicAddress, setPublicAddress] = useState('');

  useEffect(() => {
    async function setEthereumProvider() {
      const ethereumProvider = await detectEthereumProvider();

      if (ethereumProvider) setProvider(ethereumProvider);
    }

    setEthereumProvider();
  }, []);

  const onConnect = async () => {
    if (provider) {
      console.log('Ethereum successfully detected!');

      const [ethereumPublicAddress] = await provider.request({
        method: 'eth_requestAccounts',
      });

      if (ethereumPublicAddress) setPublicAddress(ethereumPublicAddress);
    } else {
      console.error('Please install MetaMask!', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>StepZen web3 app</title>
        <meta name='description' content='StepZen web3 app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to StepZen web3</h1>

        {publicAddress ? (
          <p className={styles.description}>
            Your public address
            <code className={styles.code}>{publicAddress}</code>
          </p>
        ) : (
          <div className={styles.grid}>
            {provider ? (
              <button onClick={onConnect} className={styles.connect}>
                Connect MetaMask
              </button>
            ) : (
              <a
                href='https://metamask.io/download/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Install MetaMask
              </a>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://stepzen.com?utm_source=stepzen-examples&utm_medium=default-template&utm_campaign=stepzen-examples'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src='/stepzen.svg'
              alt='StepZen Logo'
              width={100}
              height={25}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
