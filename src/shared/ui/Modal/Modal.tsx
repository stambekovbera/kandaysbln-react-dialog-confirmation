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

    const [ isClosing, setIsClosing ] = React.useState( false );
    const [ isOpening, setIsOpening ] = React.useState( false );
    const [ isMounted, setIsMounted ] = React.useState( false );
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = React.useCallback( () => {
        if (onClose) {
            setIsClosing( true );
            timeoutRef.current = setTimeout( () => {
                onClose();
                setIsOpening( false );
                setIsClosing( false );
            }, ANIMATION_DELAY );
        }
    }, [ onClose ] );

    const onKeyDown = React.useCallback( (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [ closeHandler ] );

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Record<string, unknown> = {
        [classes.opened]: isOpening,
        [classes.closing]: isClosing,
    };

    React.useEffect( () => {
        if (isOpen) {
            setIsMounted( true );

            return;
        }

        setIsMounted( false );
    }, [ isOpen ] );

    React.useEffect( () => {
        if (isOpen) {
            window.addEventListener( 'keydown', onKeyDown );
        }

        return () => {
            window.removeEventListener( 'keydown', onKeyDown );
            clearTimeout( timeoutRef.current );
        };
    }, [ isOpen, onKeyDown ] );

    React.useEffect( () => {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        if (isMounted) {
            timeout = setTimeout( () => {
                setIsOpening( true );
            }, 200 );
        }

        return () => {
            if (timeout) {
                clearTimeout( timeout );
            }
        };
    }, [ isMounted ] );

    if (!isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={ cn( classes.modal, mods, [ className ] ) }>
                <div
                    className={ classes.modalOverlay }
                    onClick={ closeHandler }
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
