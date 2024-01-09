import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ devices, title, type }) => {
  const titleDecorator = (title, index) => {
    if (/\d/.test(title)) {
      return `Семья ${index + 1}`
    } else {
      return title
    }
  }

  const data = {
    labels: Object.keys(devices).map((device, index) => titleDecorator(device, index)),
    datasets: [
      {
        label: "проголосовало",
        data: Object.values(devices).map(value => value.length),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>{title}</h1>
      <Doughnut data={data} />
      <div className={`grid ${type == 2 ? "grid-cols-2 gap-2" : "grid-cols-6 gap-6"}`}>
        {Object.entries(devices).map((data, index) => {
          return(
            <div key={index}>{titleDecorator(data[0], index)}: {data[1].length}</div>
          )
          })
        }
      </div>
    </div>


  )
};

export default Chart;
