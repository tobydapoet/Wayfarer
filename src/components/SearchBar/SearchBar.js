import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import styles from "./SearchBar.module.scss";
import Popper from "../Popper";

const cx = classNames.bind(styles);

function SearchBar({ onSearch, results = [], renderResult }) {
  const [searchValue, setSearchValue] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false);

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
      setIsResultVisible(inputValue.length > 0); // Show results if search value is not empty
    }
  };

  const handleSelectResult = (item) => {
    // Clear the search value and hide the results after selecting a result
    setSearchValue(""); // Clear the search bar
    setIsResultVisible(false); // Hide the results dropdown
    // You can do other actions here if needed, like passing selected item to a parent component
  };

  return (
    <div className={cx("search-wrapper")}>
      <FontAwesomeIcon icon={faSearch} className={cx("search-icon")} />
      <HeadlessTippy
        interactive
        visible={isResultVisible && results.length > 0}
        appendTo={() => document.body}
        placement="bottom"
        onClickOutside={() => setIsResultVisible(false)} // Close results when clicking outside
        render={(attrs) => (
          <div
            className={cx("search-result-container")}
            tabIndex="-1"
            {...attrs}
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
          className={cx("search")}
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
        />
      </HeadlessTippy>
      {!!searchValue && (
        <button className={cx("clear-icon")} onClick={deleteSearch}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
