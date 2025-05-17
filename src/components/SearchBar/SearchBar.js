import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import styles from "./SearchBar.module.scss";
import Popper from "../Popper";

const cx = classNames.bind(styles);

function SearchBar({ onSearch, results = [], renderResult, isClient }) {
  const [searchValue, setSearchValue] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false);
  const inputRef = useRef(null);

  const deleteSearch = () => {
    setSearchValue("");
    setIsResultVisible(false); // Ensure results are hidden when clearing the search bar
    onSearch("");
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith(" ")) {
      setSearchValue(inputValue);
      onSearch(inputValue);
      setIsResultVisible(inputValue.length > 0);
    }
  };

  const handleSelectResult = (item) => {
    setSearchValue("");
    setIsResultVisible(false);
  };

  return (
    <div className={cx("search-wrapper")}>
      {!isClient && (
        <FontAwesomeIcon icon={faSearch} className={cx("search-icon")} />
      )}
      <HeadlessTippy
        interactive
        visible={isResultVisible && results.length > 0}
        appendTo={() => document.body}
        placement="bottom"
        onClickOutside={() => setIsResultVisible(false)}
        render={(attrs) => (
          <div
            className={cx("search-result-container")}
            tabIndex="-1"
            {...attrs}
            style={{
              width: inputRef.current?.offsetWidth || "auto",
            }}
          >
            <Popper className={cx("search-result")}>
              {results.map((item, index) => (
                <div
                  key={index}
                  className={cx("result-item")}
                  onClick={() => handleSelectResult(item)} // Handle selection of result
                >
                  {renderResult ? renderResult(item) : item.name}
                </div>
              ))}
            </Popper>
          </div>
        )}
      >
        <input
          ref={inputRef}
          className={cx("search", { isClient })}
          placeholder={!isClient ? "search" : ""}
          value={searchValue}
          onChange={handleSearch}
        />
      </HeadlessTippy>
      {!!searchValue && !isClient && (
        <button className={cx("clear-icon")} onClick={deleteSearch}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
