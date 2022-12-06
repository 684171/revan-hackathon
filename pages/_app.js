/**
 * @author 684171
 */

import Head from "next/head";
import "../styles/global.scss";

function App({ Component, pageProps }) {
  return (
    <div id="app">
      <Head>
        <title>Dumpster</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
