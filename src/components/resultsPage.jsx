"use client"

import Link from "next/link";
import Chart from "@/components/chart";

const ResultsPage = ({ devices }) => {
  const filteredDevices = devices.filter(device => device.title.length > 0)

  const groupByKey = (objectsArray, key) => {
    return objectsArray.reduce((group, element) => {
      group[element[key]] = group[element[key]] ?? [];
      group[element[key]].push(element);
      return group;
    }, {});
  };

  const groupedDataByTitle = groupByKey(filteredDevices, "title")
  const groupedDataByFamily = groupByKey(filteredDevices, "createdAt")

  return (
    <div>
      <div className="grid place-items-center border-t py-5 w-auto">
        <Chart
          devices={groupedDataByFamily}
          title={`Всего опрошенных семей ${Object.values(groupedDataByFamily).length}. У каждой семьи следующей количество устройств:`}
          type={1}
        />
      </div>
      <div className="grid place-items-center border-t py-5 w-50">
        <Chart
          devices={groupedDataByTitle}
          title={`Всего у опрошенных семей ${filteredDevices.length} умных девайсов. Устройства распределены следующим образом:`}
          type={2}
        />
      </div>
      <div className="grid place-items-center border-t py-5">
        <Link
          className="rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white
                     shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="/"
        >
          Вернуться назад
        </Link>
      </div>
    </div>

  )
};

export default ResultsPage;
