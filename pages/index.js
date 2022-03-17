import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import detectEthereumProvider from "@metamask/detect-provider";

// Functions that convert balances to human readible
import { AddStr, Reverse } from "../utils/functions";

export default function Home(props) {
  const [provider, setProvider] = useState("");
  const [publicAddress, setPublicAddress] = useState("");

  // Get the data from StepZen API
  const [moralisTokenBalances, setMoralisTokenBalances] = useState("");
  const [moralisNFT, setMoralisNFT] = useState("");
  const [infuraGasPrices, setInfuraGasPrices] = useState("");
  const [etherscanLogs, setEtherscanLogs] = useState([]);

  useEffect(() => {
    async function setEthereumProvider() {
      const ethereumProvider = await detectEthereumProvider();

      if (ethereumProvider) setProvider(ethereumProvider);
    }

    setEthereumProvider();
  }, []);

  const onConnect = async () => {
    if (provider) {
      console.log("Ethereum successfully detected!");

      const [ethereumPublicAddress] = await provider.request({
        method: "eth_requestAccounts",
      });

      if (ethereumPublicAddress) {
        setPublicAddress(ethereumPublicAddress);

        // Fetch data from external API
        const res = await fetch(`/api/hello?address=${ethereumPublicAddress}`)
        let data = await res.json()
        data = data.data
        console.log("data", data);

        // Get the data sources to display as tables on page   
        let metadata = JSON.parse(data.moralis_nft.metadata);
        setMoralisTokenBalances(data.moralis_erc20);
        setMoralisNFT(`https://ipfs.io/${metadata.image.slice(7)}`);
        setInfuraGasPrices(data.infura_gas_price);

        // If a transaction was linked to the ethereum log
        data.etherscan_logs.result.forEach(function (element) {
          if (element.transaction.value) {
            setEtherscanLogs((etherscanLogs) => [...etherscanLogs, element]);
          }
        });
      }
    } else {
      console.error("Please install MetaMask!", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>StepZen web3 app</title>
        <meta name="description" content="StepZen web3 app" />
        <link rel="icon" href="/favicon.ico" />
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
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install MetaMask
              </a>
            )}
          </div>
        )}
        {moralisNFT ? (
          <>
            <img style={{ maxWidth: "100px" }} src={moralisNFT} alt="elon" />
            <h5 style={{ margin: "5px", color: "grey" }}>
              <em>source: moralis</em>
            </h5>
          </>
        ) : null}
        {etherscanLogs.length > 0 ? (
          <>
            <h3 style={{ margin: "40px 0 0 0" }}>
              Hash Logs with Transaction Details
            </h3>
            <h5 style={{ margin: "5px", color: "grey" }}>
              <em>source: etherscan</em>
            </h5>
            <table style={styles.table}>
              <tbody style={styles.tbody}>
                <tr style={{ borderBottom: "2px solid black" }}>
                  <td>Token</td>
                  <td>Balance</td>
                  <td>Gas Used</td>
                  <td>Transaction Hash</td>
                  <td>Transaction Input</td>
                </tr>
                {etherscanLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.address}</td>
                    <td>{log.blockNumber}</td>
                    <td>{log.gasUsed}</td>
                    <td>{log.transaction.hash.substring(0, 20)}...</td>
                    <td>{log.transaction.input.substring(0, 20)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
        {moralisTokenBalances ? (
          <>
            <h3 style={{ margin: "40px 0 0 0" }}>Your Token Balance</h3>
            <h5 style={{ margin: "5px", color: "grey" }}>
              <em>source: moralis</em>
            </h5>
            <table style={styles.table}>
              <tbody style={styles.tbody}>
                <tr style={{ borderBottom: "2px solid black" }}>
                  <td>Token</td>
                  <td>Balance</td>
                </tr>
                {moralisTokenBalances.map((token_balances, index) => (
                  <tr key={index}>
                    <td>{token_balances.name}</td>
                    <td>
                      {Reverse(
                        AddStr(
                          token_balances.balance,
                          Number(token_balances.decimals),
                          "."
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
        {infuraGasPrices ? (
          <>
            <h3 style={{ margin: "40px 0 0 0" }}>Current Gas Price</h3>
            <h5 style={{ margin: "5px", color: "grey" }}>
              <em>source: infura</em>
            </h5>
            <table style={styles.table}>
              <tbody style={styles.tbody}>
                <tr style={{ borderBottom: "2px solid black" }}>
                  <td>Price Type</td>
                  <td>Current</td>
                </tr>
                <tr>
                  <td>wei (hexidecimal)</td>
                  <td>{infuraGasPrices.result}</td>
                </tr>
                <tr>
                  <td>wei</td>
                  <td>{parseInt(infuraGasPrices.result, 16)}</td>
                </tr>
                <tr>
                  <td>ETH</td>
                  <td>
                    {parseInt(infuraGasPrices.result, 16) / 1000000000000000000}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : null}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://stepzen.com?utm_source=stepzen-examples&utm_medium=default-template&utm_campaign=stepzen-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/stepzen.svg"
              alt="StepZen Logo"
              width={100}
              height={25}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
