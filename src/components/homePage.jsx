"use client"

import Image from "next/image";
import DeviceOption from "@/components/deviceOption";
import {useRef, useState} from "react";
import { flatWords } from "russian-bad-words"
import Link from "next/link";

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
}

const HomePage = () => {
  const [smartDevicesOptions, setSmartDevicesOptions] = useState([
    {selected: false, value: "Робот-пылесос"},
    {selected: false, value: "Лампочка"},
    {selected: false, value: "Колонка Алиса"},
    {selected: false, value: "Колонка Маруся"},
    {selected: false, value: "Колонка Alexa"},
    {selected: false, value: "Колонка HomePod"},
    {selected: false, value: "Колонка SberBoom"},
    {selected: false, value: "Колонка Smart Speaker"},
    {selected: false, value: "Колонка Google Assistant"},
    {selected: false, value: "Колонка AI Speaker"},
    {selected: false, value: "Другая колонка"},
    {selected: false, value: "Жалюзи"},
    {selected: false, value: "Входной замок"},
    {selected: false, value: "Домофон"},
    {selected: false, value: "Стиральная машинка"},
    {selected: false, value: "Камера"},
    {selected: false, value: "Кухонные приборы"},
    {selected: false, value: "Телевизор"},
    {selected: false, value: "Часы"}
  ]);
  const [selectedDevices, setSelectedDevices] = useState([])
  const [resultSent, setResultSent] = useState(false)
  const [inputButtonColor, setInputButtonColor] = useState("bg-gray-600");
  const [inputButtonColorHover, setInputButtonColorHover] = useState("bg-gray-600");

  const smartDeviceInputRef = useRef(null);

  const handleInputButtonColor = (event) => {
    event.preventDefault();

    if (event.target.value.trim().length !== 0) {
      setInputButtonColor("bg-green-400");
      setInputButtonColorHover("bg-green-800");
    } else {
      setInputButtonColor("bg-gray-600");
      setInputButtonColorHover("bg-gray-600");
    }
  };

  const handleInputButtonClick = (event) => {
    event.preventDefault();

    if (!flatWords.includes(smartDeviceInputRef.current.value.trim())) {
      const deviceName = smartDeviceInputRef.current.value.trim()

      setSmartDevicesOptions((prevState) => {
        return([...prevState, { selected: true, value: deviceName }].filter(onlyUnique))
      })
      setSelectedDevices((prevState) => {
        return([...prevState, { title: deviceName }].filter(onlyUnique))
      })
    }

    smartDeviceInputRef.current.value = ""
    setInputButtonColor("bg-gray-600");
    setInputButtonColorHover("bg-gray-600");
  }

  const handleFormClick = async (event) => {
    event.preventDefault();
    await fetch("/api/devices/create", { method: "POST", body: JSON.stringify(selectedDevices) })
      .then(() => setResultSent(true))
  }

  return (
    <div>
      {resultSent
        ?
        (<div className="grid place-items-center mt-48 text-2xl text-blue-700 font-semibold">
          Большое спасибо за помощь!
        </div>)
        :
        (<form className="m-10 ml-2 mr-2 sm:ml-5 sm:mr-5 md:ml-10 md:mr-10 lg:ml-20 lg:mr-20">
        <div className="grid place-items-center">
          <Image src="/main-man.jpg" width="500" height="666" alt="main man"/>
        </div>

        <p className="indent-8 my-5">
          Всем привет! Меня зовут Стёпа. Я делаю исследовательскую работу на тему &ldquo;Робототехника в наших
          семьях&ldquo;. Я прошу вас о помощи. Пожалуйста, заполните форму на этой странице. Я не прошу никаких ваших
          персональных данных. Мне нужно знать, есть ли у вас в доме роботы. Робот-пылесос, система &ldquo;Умный
          дом&ldquo;, возможно, у вас есть умная колонка или стиральная машинка умеет запускаться со смартфона. А возможно
          у вас что-то такое, о чём я никогда не слышал. Если хотите, можете указать своё имя - оно не пойдёт в мою
          исследовательскую работу, но я буду знать у кого какие есть роботы в семье.

          На основании этих даннхы я построю графики и смогу проанализировать ситуацию с робототехникой в семьях.
          После окончания исследования, после 10 февраля 2024 года, зайдите на страницу
          <Link
            className="rounded-md bg-indigo-600 px-3 py-2 mx-2 text-sm font-semibold text-white
                     shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/results"
          >
            Текущие результаты
          </Link>
          чтобы увидеть насколько роботы захватили наш город.
        </p>

        <div className="grid place-items-center border-t py-5">
          Какие из перечисленных умных устройств есть в вашем доме?
        </div>

        <div className="space-y-8 border-b border-gray-900/10 pb-4 space-y-0 divide-y
                      divide-gray-900/10">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 2xl:lg:grid-cols-10
                     place-items-center gap-4"
            id="device-list"
          >
            { Object.entries(smartDevicesOptions).map((option) => {
              return(<DeviceOption key={ option[1].value } option={ option[1] } devicesHandler={setSelectedDevices}/>)
            } ) }
          </div>
        </div>

        <div className="grid place-items-center border-t py-5">
          Введите умное устройство &#128071; если Вы не нашли нужное в списке выше &#128070;
        </div>

        <div>
          <div className="mt-2 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                         sm:text-sm sm:leading-6"
                id="smart-device"
                name="smart-device"
                type="text"
                onChange={handleInputButtonColor}
                placeholder="Впишите недостающий умное устройство"
                ref={smartDeviceInputRef}
              />
            </div>
            <button
              className={`${inputButtonColor} hover:${inputButtonColorHover} relative ml-px inline-flex items-center` +
                "gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset" +
                "ring-gray-300"}
              onClick={handleInputButtonClick}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Добавить в список
            </button>
          </div>
        </div>


        <div className="grid place-items-center border-t py-5">
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white
                     shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleFormClick}
            type="submit"
          >
            Нажмите сюда, чтобы сохранить ваши данные для исследования
          </button>
        </div>
      </form>)}
    </div>

  )
};

export default HomePage;
