import classNames from "classnames/bind";
import styles from "./Bill.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { DestinationContext } from "../../contexts/DestinationContext";
import { PayTypeContext } from "../../contexts/PayTypeContext";
import Notice from "../../components/Notice";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { BillContext } from "../../contexts/BillContext";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from "../../components/Popper";
import { ScheduleContext } from "../../contexts/ScheduleContext";
import standardTime from "../../utils/standardTime";
import { UsageVoucherContext } from "../../contexts/UsageVoucherContext";
import VoucherItem from "../../components/VoucherItem";
import { ClientContext } from "../../contexts/ClientContext";
import SearchBar from "../../components/SearchBar";
import ClientPopper from "../../components/ClientPopper/ClientPopper";

const cx = classNames.bind(styles);

function BillForm() {
  const {
    allBills,
    errors,
    noticeBox,
    billInfo,
    totalCalculate,
    setBillInfo,
    handleSchedule,
    setNoticeBox,
    handleInputChange,
    handlePayType,
    handleUsageVoucher,
    handleCreateBill,
    handleClient,
  } = useContext(BillContext);

  const { allPayTypes } = useContext(PayTypeContext);
  const { content } = useContext(DestinationContext);
  const { allSchedules } = useContext(ScheduleContext);
  const { allUsageVouchers } = useContext(UsageVoucherContext);
  const { payTypeSelected } = useContext(PayTypeContext);
  const { edittingSchedule } = useContext(ScheduleContext);
  const { selectedUsageVoucher } = useContext(UsageVoucherContext);
  const { searchResult, handleSearchClient, clientData } =
    useContext(ClientContext);
  const [isVisible, setIsvisible] = useState(false);
  const inputRef = useRef(null);
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className={cx("wrapper")}>
      <div className={cx("img-container")}>
        {content?.image && <img src={content?.image} />}
        <div className={cx("bill-info")}>
          <div className={cx("name-destination")}>{content.name}</div>
        </div>
      </div>
      <div className={cx("bill-container")}>
        {user.position && (
          <div className={cx("search-container")}>
            <div className={cx("frame")}>Client</div>
            {Object.keys(billInfo.clientId).length === 0 ? (
              <SearchBar
                isClient
                onSearch={handleSearchClient}
                results={searchResult}
                renderResult={(client) => (
                  <ClientPopper
                    data={client}
                    onClick={() => handleClient(client)}
                  />
                )}
              />
            ) : (
              <ClientPopper isDisplay data={clientData} />
            )}
            {errors.clientId && (
              <div className={cx("error-text")}>{errors.clientId}</div>
            )}
          </div>
        )}
        <div className={cx("row")}>
          <div className={cx("time")}>
            <HeadlessTippy
              interactive
              visible={isVisible}
              placement="bottom"
              render={(attrs) => (
                <div
                  className={cx("result-container")}
                  tabIndex="-1"
                  {...attrs}
                  style={{
                    width: inputRef.current?.offsetWidth || "auto",
                  }}
                >
                  <Popper className={cx("result")}>
                    {allSchedules
                      .filter(
                        (schedules) =>
                          schedules.destinationId._id === content._id &&
                          schedules.status !== false
                      )
                      .map((schedule) => (
                        <div
                          key={schedule._id}
                          className={cx("result-item")}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSchedule(schedule, setBillInfo);
                            setIsvisible(false);
                          }}
                        >
                          <div className={cx("time")}>
                            <div className={cx("start-time")}>
                              {standardTime(schedule.startDate)}
                            </div>
                            <span> - </span>
                            <div className={cx("end-time")}>
                              {standardTime(schedule.endDate)}
                            </div>
                          </div>
                          <div className={cx("member")}>
                            {allBills
                              .filter(
                                (bill) => bill.scheduleId._id === schedule._id
                              )
                              .reduce((sum, bill) => sum + bill.num, 0)}
                            /{schedule.amount}
                          </div>
                        </div>
                      ))}
                  </Popper>
                </div>
              )}
            >
              <div className={cx("schedule-container")} ref={inputRef}>
                <div className={cx("frame")}>Schedule</div>
                <input
                  name="schedule"
                  className={cx("schedule")}
                  readOnly
                  value={
                    edittingSchedule?._id
                      ? `${standardTime(
                          edittingSchedule.startDate
                        )} - ${standardTime(edittingSchedule.endDate)}`
                      : ""
                  }
                  onClick={() => setIsvisible(true)}
                  onBlur={() => setIsvisible(false)}
                />
              </div>
            </HeadlessTippy>
            {errors.scheduleId && (
              <div className={cx("error-text")}>{errors.scheduleId}</div>
            )}
          </div>
          <div className={cx("number")}>
            <Input
              dark
              type="number"
              name="num"
              frame={
                content.unit.charAt(0).toUpperCase() + content.unit.slice(1)
              }
              value={billInfo.num}
              onChange={(e) => handleInputChange(e, setBillInfo)}
              error={errors.num}
            />
          </div>
        </div>

        <div className={cx("voucher-container")}>
          <div className={cx("frame")}>Vouchers available: </div>
          <div className={cx("voucher-list")}>
            {billInfo.num > 0 &&
              allUsageVouchers
                .filter(
                  (usagevouchers) =>
                    usagevouchers.clientId._id === user._id &&
                    !usagevouchers.usedAt &&
                    usagevouchers?.voucherId?.minCost <
                      content?.price * Number(billInfo.num)
                )
                .map((usage) => (
                  <VoucherItem
                    key={usage._id}
                    data={usage}
                    minimal
                    onClick={() => handleUsageVoucher(usage)}
                    active={selectedUsageVoucher._id === usage._id}
                  />
                ))}
          </div>
        </div>

        <div className={cx("total")}>
          <div className={cx("original-price")}>
            <span>Total price:</span>
            {(content?.price * Number(billInfo.num)).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className={cx("sale-value")}>
            <span>Sale value:</span>
            {Number(
              selectedUsageVoucher?.voucherId?.discountValue || 0
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) || "$0.00"}
          </div>
          <hr></hr>
          <div className={cx("total-value")}>
            <span>Total payment:</span>
            {totalCalculate?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) || "$0.00"}
          </div>
        </div>
        <div className={cx("pay-type")}>
          <div className={cx("pay-title")}>Payment method</div>
          <div className={cx("type-choice")}>
            {allPayTypes.map((type) => (
              <button
                key={type._id}
                onClick={() => {
                  handlePayType(type);
                }}
              >
                {type.name}
              </button>
            ))}
          </div>
          {payTypeSelected._id && (
            <img src={payTypeSelected.image} alt="Payment type" />
          )}
          {errors.paytypeId && (
            <div className={cx("error-text")}>{errors.paytypeId}</div>
          )}
        </div>

        <div className={cx("btn-container")}>
          <Button large onClick={() => handleCreateBill()}>
            Confirm
          </Button>
        </div>
      </div>
      <Notice
        warn
        open={noticeBox}
        onClose={() => setNoticeBox(false)}
        content={
          errors.payment ? errors.payment : "Something wrong with your bill !"
        }
      />
    </div>
  );
}

export default BillForm;
