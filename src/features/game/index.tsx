import classNames from "classnames";
import { useEffect, useState } from "react";
import { BiDownArrow, BiShuffle } from "react-icons/bi";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { generateItems, Item } from "./utils";
import { FaFlag } from "react-icons/fa";

const Game = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [select, setSelect] = useState<Item[]>([]);
  const [op, setOp] = useState<number>();
  const [mode, setMode] = useState<string>("number");
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState(0);

  console.log({
    items,
    select,
    op,
    mode,
  });

  const handleOnOpClick = (val: number) => {
    if (mode !== "operator") return;

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
        <div key={`${value}-${index}`}>
          <button
            disabled={!active}
            onClick={() => handleOnNumerClick(it)}
            className={classNames(
              "h-[120px] w-[120px] border border-primary text-5xl disabled:text-gray-400 disabled:bg-gray-200",
              selectIndexs.includes(index) ? "outline outline-red-500" : ""
            )}
          >
            {value}
          </button>
        </div>
      );
    });
  };

  useEffect(() => {
    setItems(generateItems(level));
  }, []);

  useEffect(() => {
    setScore(0);
    setItems(generateItems(level));
  }, [level]);

  useEffect(() => {
    if (items.length && items.every((i) => !i.active)) {
      console.log("all", items);
      setScore((p) => p + 1);
      setItems(generateItems(level));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="border border-red-500 p-2 shadow-sm gap-4 flex flex-col w-[380px] mx-auto">
      {/* header */}
      <div className="flex-none flex justify-between items-center h-16">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary bg-opacity-50">
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
            <span>{level === 1 ? "Baby" : "Student"}</span> <BiDownArrow />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => setLevel(1)}>
              <a>Baby</a>
            </li>
            <li onClick={() => setLevel(2)}>
              <a>Student</a>
            </li>
          </ul>
        </div>
        <p className="flex gap-2 items-center">
          <FaFlag />
          <span className="font-mono">{score}</span>
        </p>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary bg-opacity-50">
          <BiShuffle
            className="text-xl"
            onClick={() => {
              setItems(generateItems(level));
              setOp(undefined);
              setMode("number");
              setSelect([]);
            }}
          />
        </span>
      </div>
      {/* board */}
      <div className="flex-1 grid grid-cols-3">{renderItem()}</div>

      {/* operator */}
      <div className="h-18 flex-none grid grid-cols-4 gap-2">
        <button
          onClick={() => handleOnOpClick(0)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl",
            op === 0 ? "outline outline-red-500" : ""
          )}
        >
          +
        </button>
        <button
          onClick={() => handleOnOpClick(1)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl",
            op === 1 ? "outline outline-red-500" : ""
          )}
        >
          -
        </button>
        <button
          onClick={() => handleOnOpClick(2)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl",
            op === 2 ? "outline outline-red-500" : ""
          )}
        >
          x
        </button>
        <button
          onClick={() => handleOnOpClick(3)}
          className={classNames(
            "h-[calc(380px/4)] bg-primary text-5xl",
            op === 3 ? "outline outline-red-500" : ""
          )}
        >
          /
        </button>
      </div>
    </div>
  );
};

export default Game;
