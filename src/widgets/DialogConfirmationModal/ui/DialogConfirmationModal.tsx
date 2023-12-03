import cn from 'classnames';
import React from 'react';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';
import { useDialogConfirmation } from '@/app/providers/DialogConfirmationProvider';

interface IDialogConfirmationModalProps {
    className?: string;
}

const DialogConfirmationModalComponent: React.FC<IDialogConfirmationModalProps> = (props) => {
    const {
        className = '',
    } = props;

    const {
        acceptEvent,
        cancelEvent,
        isOpen,
        cancelButtonText,
        acceptButtonText,
        description,
        title,
        onCloseDialogConfirmation,
    } = useDialogConfirmation( true );

    const onClose = React.useCallback( () => {
        onCloseDialogConfirmation();
    }, [ onCloseDialogConfirmation ] );

    const handleCloseEvent = React.useCallback( () => {
        if (cancelEvent) {
            cancelEvent();
        }

        onClose();
    }, [ cancelEvent, onClose ] );

    const handleAcceptEvent = React.useCallback( () => {
        if (acceptEvent) {
            acceptEvent();
        }

        onClose();
    }, [ acceptEvent, onClose ] );

    return (
        <Modal
            isOpen={ isOpen }
            className={ cn( '', {}, [ className ] ) }
        >
            <p>{ title }</p>
            <p>
                { description }
            </p>
            <div>
                <button
                    onClick={ handleCloseEvent }
                >
                    { cancelButtonText }
                </button>
                <button
                    onClick={ handleAcceptEvent }
                >
                    { acceptButtonText }
                </button>
            </div>
        </Modal>
    );
};

export const DialogConfirmationModal = React.memo( DialogConfirmationModalComponent );
