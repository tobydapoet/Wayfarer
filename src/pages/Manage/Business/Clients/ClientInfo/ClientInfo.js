import classNames from "classnames/bind";
import style from "./ClientInfo.module.scss";
import ClientProfile from "../../../../../components/UserProfile/UserProfile";
import { useContext, useEffect, useState } from "react";
import DetailItem from "../../../../../components/DetailItem/DetailItem";
import ProcessingItem from "../../../../../components/ProcessingItem/ProcessingItem";
import {
  ClientContext,
  ClientProvider,
} from "../../../../../contexts/ClientContext";
import { BillContext } from "../../../../../contexts/BillContext";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style);

function ClientInfo() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const { allBills } = useContext(BillContext);
  const { email } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("summary", { collapsed: selectedItem !== null })}>
        {allBills
          .filter((bills) => bills?.clientId?.email === email)
          .map((TourItem, key) => (
            <ProcessingItem
              key={key}
              data={TourItem}
              onClick={() => setSelectedItem(TourItem)}
            />
          ))}
      </div>
      {selectedItem ? (
        <div className={cx("details", { expanded: selectedItem !== null })}>
          {selectedItem && (
            <DetailItem
              data={selectedItem}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
            />
          )}
        </div>
      ) : null}

      {(isMobile || !selectedItem) && (
        <div className={cx("client-info")}>
          <ClientProvider>
            <ClientProfile />
          </ClientProvider>
        </div>
      )}
    </div>
  );
}

export default ClientInfo;
