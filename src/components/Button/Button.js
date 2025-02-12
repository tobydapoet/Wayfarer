import { Link } from "react-router-dom";
import styles from './Button.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
function Button ({
    large,
    small,
    rounded,
    primary,
    disabled,
    onClick,
    href,
    to,
    className,
    outline, 
    children,
    ...passProps
}) {
    const Comp = 'button' 
    const props = {onClick,...passProps}

    if(disabled)
    {
        Object.key(props).forEach((key) => {
            if(key.startWith('on') && typeof(key) === 'function') {
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
        primary,
        disabled,
        primary,
    })
    return ( <Comp className={classes} {...props} target="_blank">{children}</Comp> );
}

export default Button ;