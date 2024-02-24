import classes from './Button.module.scss';
import cn from 'classnames';
import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const ButtonComponent: React.FC<IButtonProps> = (props) => {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <button
            className={ cn(classes.button, [ classes.background, className ]) }
            { ...otherProps }
        >
            { children }
        </button>
    );
};

export const Button = ButtonComponent;