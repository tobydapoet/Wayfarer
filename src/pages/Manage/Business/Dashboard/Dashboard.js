import classNames from "classnames/bind";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  ArcElement,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faDollarSign,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Dashboard.module.scss";
import Order from "../../../../components/Order";
import StaffStatus from "../../../../components/StaffStatus/StaffStatus";
import { useContext, useEffect, useState } from "react";
import { StaffContext } from "../../../../contexts/StaffContext";
import { BillContext } from "../../../../contexts/BillContext";
import formatNumber from "../../../../utils/formatNumber";
import { KpiTargetContext } from "../../../../contexts/KpiTargertContext";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { getCurrentUser } from "../../../../utils/currentUser";

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
  const user = getCurrentUser();
  const { allBills } = useContext(BillContext);
  const {
    allKpi,
    currentKpi,
    errors,
    openKpiForm,
    handleInputChange,
    handleCreateTarget,
    handleUpdateTarget,
    handleDeleteTarget,
    handleCloseKpiForm,
    handleOpenKpiForm,
    handleUpdateMonth,
  } = useContext(KpiTargetContext);

  const now = new Date();
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const endOfLastWeek = new Date(startOfThisWeek);
  endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);
  endOfLastWeek.setHours(23, 59, 59, 999);

  const billThisWeek = allBills.filter((bill) => {
    const created = new Date(bill.createdAt);
    return created >= startOfThisWeek;
  }).length;

  const billLastWeek = allBills.filter((bill) => {
    const created = new Date(bill.createdAt);
    return created >= startOfLastWeek && created <= endOfLastWeek;
  }).length;

  const actualValues = Array(7).fill(0);
  allBills.forEach((bill) => {
    if (bill.status === "Cancelled" || bill.status === "Pending confirmation")
      return;
    const date = new Date(bill.createdAt);

    const now = new Date();
    const targetYear = now.getFullYear();
    const targetMonth = now.getMonth();

    if (date.getFullYear() !== targetYear || date.getMonth() !== targetMonth)
      return;

    const dayIndex = (date.getDay() + 6) % 7;
    const amount = bill.refundAmount
      ? bill.pay - bill.refundAmount
      : bill.pay || 0;
    actualValues[dayIndex] += amount;
  });

  const maxValue = Math.max(...Object.values(actualValues));
  const roundTo = 1000;
  const roundedMaxValue = Math.ceil(maxValue / roundTo) * roundTo;
  const remainValues = actualValues.map((value) =>
    value === 0 ? roundedMaxValue : roundedMaxValue - value
  );

  const dataWeek = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Votes",
        data: actualValues,
        backgroundColor: actualValues.map((v) =>
          v === 0 ? "transparent" : "#202020"
        ),
        borderRadius: {
          bottomLeft: 10,
          bottomRight: 10,
          topLeft: 10,
          topRight: 10,
        },

        borderSkipped: "top",
        barThickness: "flex",
        maxBarThickness: 45,
      },
      {
        label: "Remaining",
        data: remainValues,
        borderColor: "#202020",
        borderWidth: 1,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 10,
          bottomRight: 10,
        },
        borderSkipped: actualValues.map((value) =>
          value === 0 ? false : "bottom"
        ),
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyRevenue = allBills.reduce((sum, bill) => {
    const billDate = new Date(bill.createdAt);
    if (
      bill.status !== "Cancelled" &&
      bill.status !== "Pending confirmation" &&
      billDate.getMonth() === currentMonth &&
      billDate.getFullYear() === currentYear
    ) {
      return sum + (bill.refundAmount ?? bill.pay ?? 0);
    }
    return sum;
  }, 0);

  const billCount = allBills.reduce((count, bill) => {
    const billDate = new Date(bill.createdAt);
    if (
      bill.status !== "Cancelled" &&
      bill.status !== "Pending confirmation" &&
      billDate.getMonth() === currentMonth &&
      billDate.getFullYear() === currentYear
    ) {
      return count + 1;
    }
    return count;
  }, 0);

  let revenueTarget = 0;
  let billTarget = 0;
  const currentKpiMonth = allKpi.find(
    (kpi) =>
      kpi.year === new Date().getFullYear() &&
      kpi.month === new Date().getMonth() + 1
  );
  if (currentKpiMonth) {
    revenueTarget = currentKpiMonth.target.revenue;
    billTarget = currentKpiMonth.target.billCount;
  }

  const generateKPIChartData = (
    value,
    target,
    colors = ["#202020", "#e0e0e0"]
  ) => {
    const remaining = Math.max(target - value, 0);

    return {
      labels: ["Finish", "Remain"],
      datasets: [
        {
          data: [value, remaining],
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    };
  };

  const generateKPIChartOptions = (target) => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percent = ((value / target) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  });

  const dataRevenue = generateKPIChartData(monthlyRevenue, revenueTarget);
  const optionRevenue = generateKPIChartOptions(revenueTarget);

  const dataBill = generateKPIChartData(billCount, billTarget);
  const optionsBill = generateKPIChartOptions(billTarget);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const lastDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    if (
      currentKpiMonth?.month === currentMonth &&
      now.getDate() === lastDayOfMonth
    ) {
      handleUpdateMonth(
        currentKpiMonth._id,
        currentKpiMonth.monthlyRevenue,
        currentKpiMonth.billCount
      );
    }
  }, []);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("main-dashboard")}>
          <div className={cx("basic-infor")}>
            <div className={cx("profit")}>
              <div className={cx("parameter")}>
                <div className={cx("topic")}>
                  <FontAwesomeIcon className={cx("icon")} icon={faDollarSign} />{" "}
                  <strong>Profit</strong>
                </div>
              </div>

              <div className={cx("number")}>
                ${" "}
                {formatNumber(
                  allBills.reduce((sum, bill) => {
                    const date = new Date(bill.createdAt);
                    const currentYear = new Date().getFullYear();

                    if (
                      bill.status !== "Pending Confirmation" &&
                      bill.status !== "Cancelled" &&
                      date.getFullYear() === currentYear
                    ) {
                      const amount = bill.refundAmount ?? bill.pay;
                      return sum + (amount || 0);
                    }
                    return sum;
                  }, 0)
                )}
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
                ${" "}
                {formatNumber(
                  allBills.reduce((sum, bill) => {
                    const usageYear = new Date(
                      bill.usageVoucherId?.usedAt
                    ).getFullYear();
                    const currentYear = new Date().getFullYear();
                    if (
                      bill.usageVoucherId?.usedAt &&
                      bill.usageVoucherId?.voucherId?.discountValue &&
                      usageYear === currentYear
                    ) {
                      return sum + bill.usageVoucherId.voucherId.discountValue;
                    }
                    return sum;
                  }, 0)
                )}
              </div>
            </div>
            <div className={cx("bills")}>
              <div className={cx("parameter")}>
                <div className={cx("topic")}>
                  <FontAwesomeIcon className={cx("icon")} icon={faUser} />{" "}
                  <strong>Bills</strong>
                </div>
              </div>
              <div className={cx("number")}>
                {allBills.reduce((count, bill) => {
                  const date = new Date(bill.createdAt);
                  const currentYear = new Date().getFullYear();

                  return bill.status !== "Cancelled" &&
                    bill.status !== "Pending confirmation" &&
                    date.getFullYear() === currentYear
                    ? count + 1
                    : count;
                }, 0)}
              </div>
            </div>
          </div>
          <div className={cx("chart")}>
            <div>
              <strong>Bill in The Last Week</strong>
            </div>
            <div className={cx("growth-percent")}>
              + {((billLastWeek / billThisWeek) * 100).toFixed(1)} %
            </div>
            <Bar data={dataWeek} options={optionsWeek} plugins={plugins} />
          </div>
          <div className={cx("last-order")}>
            <strong>Current Orders</strong>
            <table>
              <tbody className={cx("list-orders")}>
                {allBills.slice(0, 5).map((order) => (
                  <Order key={order._id} data={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={cx("sub-dashboard")}>
          <div className={cx("kpi-container")}>
            <div className={cx("profitTarget-container")}>
              <div className={cx("profit-target")}>Profit target</div>
              <div className={cx("pie-chart")}>
                <Doughnut data={dataRevenue} options={optionsBill} />
                <div className={cx("percent-kpi")}>
                  {Math.round((monthlyRevenue / revenueTarget) * 100)}%
                </div>
              </div>
            </div>
            <div className={cx("billTarget-container")}>
              <div className={cx("bill-target")}>Bill target</div>
              <div className={cx("pie-chart")}>
                <Doughnut data={dataBill} options={optionRevenue} />
                <div className={cx("percent-kpi")}>
                  {Math.round((billCount / billTarget) * 100)}%
                </div>
              </div>
            </div>
          </div>
          <div className={cx("kpi-list")}>
            {user.position === "super admin" && (
              <div
                className={cx("kpi-create-btn")}
                onClick={() => handleOpenKpiForm()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
            <div className={cx("list")}>
              <div className={cx("list-container")}>
                {allKpi
                  .sort((a, b) => b.month - a.month)
                  .map((kpi) => (
                    <div
                      key={kpi._id}
                      className={cx("kpi-item")}
                      onClick={() => handleOpenKpiForm(kpi)}
                    >
                      <div className={cx("time")}>
                        {kpi.month}/{kpi.year}
                      </div>
                      <div className={cx("rate")}>
                        <div className={cx("revenue")}>
                          <span>Revenue:</span> {kpi.actual.revenue}/
                          {kpi.target.revenue}
                        </div>
                        <div className={cx("bill")}>
                          <span>Bill:</span> {kpi.actual.billCount}/
                          {kpi.target.billCount}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal form open={openKpiForm} onClose={() => handleCloseKpiForm()}>
        {!currentKpi._id && (
          <Input
            dark
            frame="Month"
            name="month"
            type="number"
            value={currentKpi.month}
            onChange={handleInputChange}
            error={errors?.month}
          />
        )}
        <div className={cx("kpi-target-value")}>
          <Input
            dark
            frame="Profit target"
            name="target.revenue"
            type="number"
            value={currentKpi.target.revenue}
            onChange={handleInputChange}
            error={errors["target.revenue"]}
          />
          <Input
            dark
            frame="Bill target"
            name="target.billCount"
            type="number"
            value={currentKpi.target.billCount}
            onChange={handleInputChange}
            error={errors["target.billCount"]}
          />
        </div>
        <div className={cx("btn-container")}>
          <Button
            rounded
            onClick={() =>
              currentKpi._id ? handleUpdateTarget() : handleCreateTarget()
            }
          >
            Save
          </Button>
          {currentKpi._id && (
            <Button rounded onClick={() => handleDeleteTarget()}>
              Delete
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Dashboard;
