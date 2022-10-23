import dynamic from "next/dynamic";
import { FC, ReactNode, useEffect } from "react";
import useTheme from "hooks/useTheme";

const ThemePicker = dynamic(() => import("components/ThemePicker"), {
  ssr: false,
});

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { listenTheme } = useTheme();

  useEffect(() => {
    listenTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-rows-2">
      {/* header */}
      <div className="h-16">
        <ThemePicker />
      </div>

      {/* content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
