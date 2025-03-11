import { Link } from "react-router-dom";
import styles from './Button.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
function Button ({
    large,
    small,
    medium,
    nav,
    rounded,
    primary,
    disabled,
    onClick,
    href,
    to,
    className,
    outline, 
    children,
    email,
    facebook,
    leftIcon,
    rightIcon,

    ...passProps
}) {
    const Comp = 'button' 
    const props = {onClick,...passProps}

    if(disabled)
    {
        Object.keys(props).forEach((key) => {
            if(key.startsWith('on') && typeof(key) === 'function') {
                delete props[key]
            }
        })
    }
    
    if(to){
        Comp = Link
        props.to = to
    }
    else if(href) {
        Comp = 'a'
        props.href = href
    }
    const classes = cx('wrapper', {
        [className]: className,
        large,
        small,
        rounded,
        nav,
        primary,
        disabled,
        primary,
        medium,
        email,
        facebook,
        leftIcon,
        rightIcon,
    })
    return ( 
        <Comp 
            className={classes} 
            {...props} 
            target="_blank"
        >
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp> 
    );
}

export default Button ;