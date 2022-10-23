import { FC, ReactNode, useEffect } from "react";
import useTheme from "hooks/useTheme";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { listenTheme } = useTheme();

  useEffect(() => {
    listenTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col" data-theme="cupcake">
      {/* header */}
      {/* <div className="h-16 px-4 mx-auto w-full max-w-[1600px] flex justify-between items-center">
        <p className="text-4xl font-mono">ETM</p>
        <a className="cursor-pointer">
          <MdSettings className="text-2xl" />
        </a>
      </div> */}

      {/* page content */}
      <main className="page flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
