import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import {faCircleXmark, faSearch} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './SearchBar.module.scss';
import Popper from '../Popper'



const cx = classNames.bind(styles)
function SearchBar() {
    
    const [searchValue,setSearchValue] = useState('')
    const [showResult , setShowResult] = useState(false)
    
    const deleteSearch = () => {
        setSearchValue('')
    }

    const handleSearch = (e) => {
        const inputValue = e.target.value
        if(!inputValue.startsWith(' ')){
            setSearchValue(inputValue)
        }
    }
    

    return ( 
    <div className={cx('search-wrapper')}>
        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
        <HeadlessTippy
            interactive
            visible = {searchValue.length > 0}
            placement="bottom"
            render={attrs => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <Popper>Hello ădawdawdwadawđ</Popper>
                </div>
            )}
        >
            <input 
                className= {cx('search')}
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
                
            /> 
        </HeadlessTippy>
        {!!searchValue &&
            <button className={cx('clear-icon')} onClick={deleteSearch}>
                <FontAwesomeIcon icon={faCircleXmark}/>
            </button>
        }
    </div>);
}

export default SearchBar;