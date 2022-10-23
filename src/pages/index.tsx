import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("components/Layout"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Layout>
      <button className="btn btn-primary">One</button>
      <button className="btn btn-secondary">Two</button>
      <button className="btn btn-accent btn-outline">Three</button>
    </Layout>
  );
};

export default Home;
