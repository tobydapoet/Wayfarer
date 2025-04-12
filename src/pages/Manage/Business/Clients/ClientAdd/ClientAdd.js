import classNames from "classnames/bind";
import style from "./ClientAdd.module.scss";
import ClientProfile from "../../../../../components/UserProfile";
import { ClientProvider } from "../../../../../contexts/ClientContext";

const cx = classNames.bind(style);

function ClientAdd() {
  return (
    <div className={cx("wrapper")}>
      <ClientProvider>
        <ClientProfile />
      </ClientProvider>
    </div>
  );
}
export default ClientAdd;
