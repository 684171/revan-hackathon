import Head from "next/head";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div id="title-container">
      <div id="title">Dumpster</div>
      <Map />
    </div>
  );
}
