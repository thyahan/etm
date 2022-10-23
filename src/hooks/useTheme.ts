import { useCallback, useState } from "react";

const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(
    window.localStorage.getItem("theme") || ""
  );

  const listenTheme = useCallback(() => {
    window.addEventListener("storage", () => {
      const currentTheme = window.localStorage.getItem("theme") || "";
      document.documentElement.setAttribute("data-theme", currentTheme);
    });
  }, []);

  const changeTheme = useCallback((theme: string) => {
    window.localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("storage"));
    setCurrentTheme(theme);
  }, []);

  return {
    theme: currentTheme,
    listenTheme,
    changeTheme,
  };
};

export default useTheme;
