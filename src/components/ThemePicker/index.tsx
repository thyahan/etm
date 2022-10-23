import useTheme from "hooks/useTheme";

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
      <label tabIndex={0} className="btn m-1">
        {theme}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {themes.map((t) => {
          return (
            <li
              key={t}
              onClick={() => changeTheme(t)}
              className="capitalize border-b border-red-500 cursor-pointer"
            >
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemePicker;
