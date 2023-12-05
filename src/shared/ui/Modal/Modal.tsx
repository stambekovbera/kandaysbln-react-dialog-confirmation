import classes from './Modal.module.scss';
import cn from 'classnames';
import React from 'react';
import { Portal } from '@/shared/ui/Portal/Portal';

const ANIMATION_DELAY = 200;

interface IModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void
}

export const Modal: React.FC<IModalProps> = (props) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;

    const [ isClosing, setIsClosing ] = React.useState(false);
    const [ isOpening, setIsOpening ] = React.useState(false);
    const [ isMounted, setIsMounted ] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = React.useCallback((callback?: () => void) => {
        setIsClosing(true);
        timeoutRef.current = setTimeout(() => {
            if (callback) {
                callback();
            }
            setIsOpening(false);
            setIsClosing(false);
            setIsMounted(false);
        }, ANIMATION_DELAY);
    }, []);

    const closeHandlerWithOnClose = React.useCallback(() => {
        if (onClose) {
            closeHandler(onClose);
        }
    }, [ closeHandler, onClose ]);

    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [ closeHandler ]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Record<string, unknown> = {
        [classes.opened]: isOpening,
        [classes.closing]: isClosing,
    };

    React.useEffect(() => {
        if (isOpen) {
            if (onClose) {
                window.addEventListener('keydown', onKeyDown);
            }
            setIsMounted(true);
        }

        if (!isOpen && !onClose) {
            closeHandler();
        }

        return () => {
            if (onClose) {
                window.removeEventListener('keydown', onKeyDown);
            }
            
            clearTimeout(timeoutRef.current);
        };
    }, [ closeHandler, closeHandlerWithOnClose, isOpen, onClose, onKeyDown ]);

    React.useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | null = null;

        if (isMounted) {
            timeout = setTimeout(() => {
                setIsOpening(true);
            }, ANIMATION_DELAY);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [ isMounted ]);

    if (!isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={ cn(classes.modal, mods, [ className ]) }>
                <div
                    className={ classes.modalOverlay }
                    onClick={ closeHandlerWithOnClose }
                >
                    <div
                        className={ classes.modalContent }
                        onClick={ onContentClick }
                    >
                        { children }
                    </div>
                </div>
            </div>
        </Portal>
    );
};
