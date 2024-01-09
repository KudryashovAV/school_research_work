"use client"

import { useEffect, useState } from "react";

const DeviceOption = ({ option, devicesHandler }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(option.selected)
  }, [option]);

  const toggleColor = () => {
    if (option.selected || clicked) {
      setClicked(false)
      devicesHandler((prevState) => prevState.filter((device) => device.title !== option.value))
    } else {
      setClicked(true)
      devicesHandler((prevState) => [...prevState, { title: option.value }])
    }
  }

  return (
    <div
      className={`${clicked ? "bg-green-500" : "bg-teal-300"} inline-block rounded-full px-6 pb-2 pt-2.5 text-xs` +
                 "font-medium uppercase leading-normal" +
                 "text-neutral-700 shadow-md transition duration-150 ease-in-out focus:bg-teal-300 active:bg-teal-400"}
      id={ option.value }
      onClick={toggleColor}
    >
      { option.value }
    </div>
  );
};

export default DeviceOption;
