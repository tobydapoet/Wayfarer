import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingLuggage } from "@fortawesome/free-solid-svg-icons";
import styles from "./Chart.module.scss";

const cx = classNames.bind(styles);

function Chart({ last, current }) {
  const contentMap = {
    lastYear: {...last },
    thisYear: {...current },
  };
  const contentLast = contentMap.lastYear || {};
  const contentCurrent = contentMap.thisYear || {};

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360); 
    return `hsl(${hue}, 90%, 50%)`; 
  };


  const ColorLine = ({ year1, year2 }) => {
    const result = (year2 / year1) * 100;
    const randomColor = getRandomPastelColor(); 
    if (result > 200) {
      return (
        <>
          <div className={cx("percent")}>+{Math.round(result - 100)}%</div>
          <div
            className={cx("color-line")}
            style={{ width: "100%", left: "0" ,backgroundColor:randomColor }}
          ></div>
        </>
      );
    } else if (result > 100 && result < 200) {
      return (
        <>
          <div className={cx("percent")}>+{Math.round(result - 100)}%</div>
          <div
            className={cx("color-line")}
            style={{ width: `${result - 100}%`, left: "0" ,backgroundColor:randomColor }}
          ></div>
        </>
      );
    } else if (result < 100) {
      return (
        <>
          <div className={cx("percent")}>-{Math.round(100 - result)}%</div>
          <div
            className={cx("color-line")}
            style={{ width: `${100 - result}%`, right: "0" ,backgroundColor:randomColor }}
          ></div>
        </>
      );
    }
  };

  const commonKeys = Object.keys(contentLast).filter(
    (key) => key in contentCurrent && key !== 'year'
  );


  return (
    <>
      <div className={cx('year')}>
        <div className={cx('year-left')}>
          {contentLast.year}
        </div>
        <div className={cx('year-right')}>
          {contentCurrent.year}
        </div>
      </div>
      {commonKeys.map((key) => (
        <div className={cx("row")}>
          <div className={cx("left")}>
            <div className={cx("icon-container")}>
              <FontAwesomeIcon
                className={cx("icon")}
                icon={faPersonWalkingLuggage}
              />
            </div>
            <div className={cx("content")}>
              <div className={cx("number")}>{contentLast[key]}</div>
              <div className={cx("topic")}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
            </div>
          </div>

          <div className={cx("container-line")}>
            <div className={cx("gray-line")}></div>
            <ColorLine
              year1={contentLast[key]}
              year2={contentCurrent[key]}
            />
          </div>

          <div className={cx("right")}>
            <div className={cx("icon-container")}>
              <FontAwesomeIcon
                className={cx("icon")}
                icon={faPersonWalkingLuggage}
              />
            </div>
            <div className={cx("content")}>
              <div className={cx("number")}>{contentCurrent[key]}</div>
              <div className={cx("topic")}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Chart;
