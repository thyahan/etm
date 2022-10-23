import useTheme from "hooks/useTheme";
import { BiChevronDown } from "react-icons/bi";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const ThemePicker = () => {
  const { changeTheme, theme } = useTheme();

  return (
    <div className="dropdown">
      <label
        tabIndex={0}
        className="btn m-1 w-32 capitalize flex items-center justify-between"
      >
        <span>{theme}</span>
        <BiChevronDown />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
      >
        {themes.map((t) => {
          return (
            <li
              data-theme={t}
              key={t}
              onClick={() => changeTheme(t)}
              className="p-2 capitalize border-b cursor-pointer mb-1  border-2 border-gray-400 rounded-md"
            >
              <div className="h-full flex item-center gap-1 justify-between">
                <p>{t}</p>
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-4 rounded-md bg-primary"></span>
                  <span className="w-2 h-4 rounded-md bg-secondary"></span>
                  <span className="w-2 h-4 rounded-md bg-accent"></span>
                  <span className="w-2 h-4 rounded-md bg-neutral"></span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemePicker;
