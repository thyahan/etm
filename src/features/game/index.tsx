import classNames from "classnames";
import { useEffect, useState } from "react";
import { BiDownArrow, BiShuffle } from "react-icons/bi";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { generateItems, Item } from "./utils";
import { FaFlag } from "react-icons/fa";
import {
  RiDivideFill,
  RiAddFill,
  RiCloseLine,
  RiSubtractLine,
} from "react-icons/ri";

const operator = ["+", "-", "x", "÷"];

// let timer: NodeJS.Timeout | undefined = undefined;

const Game = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [select, setSelect] = useState<Item[]>([]);
  const [op, setOp] = useState<number>();
  const [mode, setMode] = useState<string>("number");
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState(0);
  const [shuffle, setShuffle] = useState(3);
  // const [end, setEnd] = useState(false);

  const handleOnOpClick = (val: number) => {
    if (mode !== "operator" && select.length !== 1) return;

    setOp(val);
    setMode("number");
  };

  const handleOnNumerClick = (it: Item) => {
    if (mode !== "number") return;

    if (select.length === 0) {
      setSelect((prev) => [...prev, it]);
      setMode("operator");
      return;
    }

    if (select.length === 1) {
      setSelect((prev) => [...prev, it]);
      return;
    }

    let result = undefined;

    switch (op) {
      case 0:
        result = select[0].value + select[1].value;
        break;
      case 1:
        result = select[0].value - select[1].value;
        break;
      case 2:
        result = select[0].value * select[1].value;
        break;
      case 3:
        result = select[0].value / select[1].value;
        break;

      default:
        break;
    }

    if (result === it.value) {
      const toInActiveIndex = [select[0].index, select[1].index, it.index];
      setItems((prev) =>
        prev.map((p) => ({
          ...p,
          active: p.active ? !toInActiveIndex.includes(p.index) : p.active,
        }))
      );
    }

    setMode("number");
    setOp(undefined);
    setSelect([]);
  };

  const renderItem = () => {
    const selectIndexs = select.map((s) => s.index) || [];
    return items.map((it) => {
      const { index, value, active } = it;
      return (
        <button
          key={`${value}-${index}`}
          disabled={!active}
          onClick={() => handleOnNumerClick(it)}
          className={classNames(
            "w-full h-[120px] sm:h-[160px]",
            "text-3xl lg:text-4xl xl:text-5xl",
            "flex items-center justify-center bg-primary font-mono",
            "disabled:text-base-100 disabled:bg-neutral",
            "active:bg-secondary active:text-base-100 active:scale-110",
            selectIndexs.includes(index)
              ? "bg-secondary text-base-100 scale-110"
              : ""
          )}
        >
          {value}
        </button>
      );
    });
  };

  const renderDisplay = () => {
    if (select.length === 2 && typeof op === "number") {
      return `${select[0].value} ${operator[op]} ${select[1].value} = ?`;
    }

    if (select.length === 1 && typeof op === "number") {
      return `${select[0].value} ${operator[op]} ? = ?`;
    }

    if (select.length === 1) {
      return select[0].value;
    }

    return "";
  };

  useEffect(() => {
    setItems(generateItems(level));
  }, []);

  useEffect(() => {
    setScore(0);
    setItems(generateItems(level));
  }, [level]);

  // useEffect(() => {
  //   timer = setTimeout(() => {
  //     setEnd(true);
  //   }, 60 * 1000);
  // });

  useEffect(() => {
    if (items.length && items.every((i) => !i.active)) {
      console.log("all", items);
      setScore((p) => p + 1);
      setItems(generateItems(level));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="p-2 gap-4 flex flex-col w-full max-w-[720px] mx-auto">
      {/* header */}
      <div className="flex-none flex justify-between items-center h-16">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary bg-opacity-70">
          <MdOutlineSettingsBackupRestore
            className="text-xl"
            onClick={() => {
              setItems((prev) => prev.map((p) => ({ ...p, active: true })));
              setOp(undefined);
              setMode("number");
              setSelect([]);
            }}
          />
        </span>

        <div className="dropdown w-28">
          <label
            tabIndex={0}
            className="btn m-1 flex justify-between items-center"
          >
            <span>{level === 1 ? "Baby" : "Kid"}</span> <BiDownArrow />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => setLevel(1)}>
              <a>Baby</a>
            </li>
            <li onClick={() => setLevel(2)}>
              <a>Kid</a>
            </li>
          </ul>
        </div>
        <p className="flex gap-2 items-center">
          <FaFlag />
          <span className="font-mono">{score}</span>
        </p>
        <span
          className={classNames(
            "w-12 h-8 flex items-center justify-center rounded-full gap-1",
            shuffle === 0
              ? "bg-secondary opacity-20"
              : "bg-secondary bg-opacity-70"
          )}
        >
          <BiShuffle
            className="text-xl"
            onClick={() => {
              if (shuffle === 0) return;
              setItems(generateItems(level));
              setOp(undefined);
              setMode("number");
              setSelect([]);
              setShuffle((p) => p - 1);
            }}
          />
          {shuffle}
        </span>
      </div>
      {/* display */}
      <div className="w-full h-6 font-mono text-neutral flex items-center px-2 justify-end">
        {renderDisplay()}
      </div>

      {/* board */}
      <div className="flex-1 grid grid-cols-3 gap-1">{renderItem()}</div>

      {/* operator */}
      <div className="h-18 flex-none grid grid-cols-4 gap-2">
        <button
          onClick={() => handleOnOpClick(0)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl flex justify-center items-center rounded-md",
            "active:bg-secondary active:text-base-100 active:scale-110",
            op === 0 ? "bg-secondary text-base-100 scale-110" : ""
          )}
        >
          <RiAddFill />
        </button>
        <button
          onClick={() => handleOnOpClick(1)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl flex justify-center items-center rounded-md",
            "active:bg-secondary active:text-base-100 active:scale-110",
            op === 1 ? "bg-secondary text-base-100 scale-110" : ""
          )}
        >
          <RiSubtractLine />
        </button>
        <button
          onClick={() => handleOnOpClick(2)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl flex justify-center items-center rounded-md",
            "active:bg-secondary active:text-base-100 active:scale-110",
            op === 2 ? "bg-secondary text-base-100 scale-110" : ""
          )}
        >
          <RiCloseLine />
        </button>
        <button
          onClick={() => handleOnOpClick(3)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl flex justify-center items-center rounded-md",
            "active:bg-secondary active:text-base-100 active:scale-110",
            op === 3 ? "bg-secondary text-base-100 scale-110" : ""
          )}
        >
          <RiDivideFill />
        </button>
      </div>
    </div>
  );
};

export default Game;
