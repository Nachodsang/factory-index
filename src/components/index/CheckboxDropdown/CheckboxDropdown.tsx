"use client";
import { useState } from "react";
// checkbox component
const CheckBox = ({
  category,
  title,
  onCheckBoxSelection,
  value,
}: {
  category: string;
  title: any;
  onCheckBoxSelection: any;
  value: any;
  // isChecked: any;
  // setIsChecked: any;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheck = () =>
    // value: any, title: any
    {
      setIsChecked(!isChecked);
      // onCheckBoxSelection(value, title);
    };

  //
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className={`checkbox-accent checkbox h-4 w-4 rounded border-none ring-2 hover:cursor-pointer ${category}-ring`}
        value={title}
        onClick={onCheck}
        checked={isChecked}
        ////={() => onCheckBoxSelection(value, title)}
        onChange={() => {
          onCheckBoxSelection(value, title);
        }}
      />
      <label>{title}</label>
    </div>
  );
};
// arr of checkbox generator
let arr: number[] = [];
for (let i = 0; i <= 20; i++) {
  arr.push(i);
}

export default function CheckboxDropdown({
  title,
  checkboxes,
  category,
  isHidden,
  onFoldDropDown,
  onCheckBoxSelection,
  onClearSelection,
  value,
}: any) {
  // const [isChecked, setIsChecked] = useState(false);
  // second row dropdowns
  const isSecondRow =
    title === "checkbox 5" || title === "checkbox 6" || title === "checkbox 7";
  // confirm handle
  const onConfirm = () => {
    onFoldDropDown();
  };

  return (
    <div
      className={`${
        isSecondRow ? "top-[150px]" : "top-[100px]"
      } absolute w-full border   bg-white ${category}-border z-40 rounded-md ${
        isHidden ? "flex" : "hidden"
      }`}
    >
      <div className="flex w-full flex-col gap-y-6 p-6  ">
        <div className={`border-b-4 pb-6  ${category}-border`}>
          <h1 className="text-center ">{title}</h1>
        </div>
        <div className="grid w-full grid-cols-2 tablet2:grid-cols-3 desktop0:grid-cols-4">
          {arr.map((i, index) => (
            <CheckBox
              onCheckBoxSelection={onCheckBoxSelection}
              category={category}
              title={i}
              key={index}
              value={value}
            />
          ))}
        </div>
        <div className="flex justify-end  gap-1 font-semibold text-white">
          <button
            className={`rounded-md bg-green-500 px-4 py-2`}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            onClick={onClearSelection}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
