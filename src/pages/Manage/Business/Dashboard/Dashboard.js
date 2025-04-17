import classNames from "classnames/bind";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  Ticks,
  ArcElement,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.scss";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Order from "../../../../components/Order";
import StaffStatus from "../../../../components/StaffStatus/StaffStatus";
import { useContext } from "react";
import { StaffContext } from "../../../../contexts/StaffContext";

const cx = classNames.bind(styles);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const profitDay = {
    monday: 5200,
    tuesday: 1200,
    wednesday: 700,
    thursday: 3100,
    friday: 2200,
    saturday: 900,
    sunday: 4300,
  };

  const balanceMonth = 15000;

  const salesMonth = {
    tours: 10000,
    services: 6000,
    sponsorship: 5000,
  };

  const ORDERS = [
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 1,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 3,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 6,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 0,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 2,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 3,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 3,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 7,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 4,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
    {
      id: 1,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAz7TV79RYxtJu5RScxRax-OljYqpIKqPxw&s",
      client: "Davis Astee3",
      total: "2020",
      service: "Temple of Literature1",
      status: 7,
      dateStart: "03/05/2025",
      dateEnd: "03/06/2025",
    },
  ];

  const totalSales = Object.values(salesMonth).reduce(
    (sum, value) => sum + value,
    0
  );

  const userLastWeek = 2000;
  const userThisWeek = 2750;

  const actualValues = Object.values(profitDay);
  const maxValue = Math.max(...Object.values(profitDay));
  const roundTo = 1000;
  const roundedMaxValue = Math.ceil(maxValue / roundTo) * roundTo;
  const remainValues = actualValues.map((value) => roundedMaxValue - value);

  const dataWeek = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Votes",
        data: actualValues,
        backgroundColor: "#202020",
        boderWidth: 1,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 10,
          bottomRight: 10,
        },
        borderSkipped: "top",
        barThickness: "flex",
        maxBarThickness: 45,
      },
      {
        label: "Remaining",
        data: remainValues,
        borderColor: "rgb(119, 68, 68)",
        boderWidth: 1,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: "bottom",
        barThickness: "flex",
        maxBarThickness: 45,
      },
    ],
  };

  const optionsWeek = {
    hover: {
      mode: "nearest",
      animationDuration: 300,
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,

        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: roundTo,
        },
        suggestedMin: 0,
        suggestedMax: roundedMaxValue,
      },
    },

    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.dataset.label !== "Remaining";
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        bodyFont: { size: 14, weight: "bold" },
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            let value = context.raw;
            return ` ${value} $`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const dataMonth = {
    labels: ["Tours", "Services", "Sponsorship"],
    datasets: [
      {
        data: [
          (salesMonth.tours / totalSales) * 100,
          (salesMonth.services / totalSales) * 100,
          (salesMonth.sponsorship / totalSales) * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4365", "#2682CB", "#FFAE46"],
      },
    ],
  };

  const optionsMonth = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 12,
        },
      },
    },
  };
  const { allStaffsData } = useContext(StaffContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-dashboard")}>
        <div className={cx("basic-infor")}>
          <div className={cx("balance")}>
            <div className={cx("parameter")}>
              <div className={cx("topic")}>
                <FontAwesomeIcon className={cx("icon")} icon={faDollarSign} />{" "}
                <strong>Balance</strong>
              </div>
            </div>
            <div className={cx("number")}>
              $ {balanceMonth.toLocaleString("us-US")}
            </div>
            <div className={cx("growth")}>
              <div className={cx("growth-percent")}>+ 16% </div>
              <span>vs last month</span>
            </div>
          </div>
          <div className={cx("sales")}>
            <div className={cx("parameter")}>
              <div className={cx("topic")}>
                <FontAwesomeIcon className={cx("icon")} icon={faPercent} />{" "}
                <strong>Sales</strong>
              </div>
            </div>
            <div className={cx("number")}>
              $ {totalSales.toLocaleString("us-US")}
            </div>
            <div className={cx("growth")}>
              <div className={cx("growth-percent")}>+ 16% </div>
              <span>vs last month</span>
            </div>
          </div>
          <div className={cx("users")}>
            <div className={cx("parameter")}>
              <div className={cx("topic")}>
                <FontAwesomeIcon className={cx("icon")} icon={faUser} />{" "}
                <strong>Profit</strong>
              </div>
            </div>
            <div className={cx("number")}>
              $ {(totalSales - balanceMonth).toLocaleString("us-US")}
            </div>
            <div className={cx("growth")}>
              <div className={cx("growth-percent")}>+ 16% </div>
              <span>vs last month</span>
            </div>
          </div>
        </div>
        <div className={cx("chart")}>
          <div>
            <strong>User in The Last Week</strong>
          </div>
          <div className={cx("growth-percent")}>
            + {((userLastWeek / userThisWeek) * 100).toFixed(1)} %
          </div>
          <Bar data={dataWeek} options={optionsWeek} plugins={plugins} />
        </div>
        <div className={cx("last-order")}>
          <strong>Last Oders</strong>
          <div className={cx("search-bar")}>
            <SearchBar />
          </div>
          <table>
            <tbody className={cx("list-orders")}>
              {ORDERS.map((order, key) => (
                <Order key={key} data={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={cx("sub-dashboard")}>
        <div className={cx("pie-chart")}>
          <Pie data={dataMonth} options={optionsMonth} plugins={plugins} />
        </div>
        <div className={cx("list-staffs")}>
          <div className={cx("title")}>Staffs</div>
          <div className={cx("staffs-container")}>
            {allStaffsData
              .sort((a, b) => a.status - b.status)
              .map((staff, key) => (
                <StaffStatus key={key} data={staff} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
