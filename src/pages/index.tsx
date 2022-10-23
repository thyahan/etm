import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("components/Layout"), { ssr: false });
const Game = dynamic(() => import("features/game"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Layout>
      <Game />
    </Layout>
  );
};

export default Home;
