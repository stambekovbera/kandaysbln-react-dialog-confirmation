import classes from './DialogConfirmationModal.module.scss';
import cn from 'classnames';
import React from 'react';
import { Button } from '@/shared/ui/Button/Button';
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
    } = useDialogConfirmation(true);

    const onClose = React.useCallback(() => {
        onCloseDialogConfirmation();
    }, [ onCloseDialogConfirmation ]);

    const handleCloseEvent = React.useCallback(() => {
        if (cancelEvent) {
            cancelEvent();
        }

        onClose();
    }, [ cancelEvent, onClose ]);

    const handleAcceptEvent = React.useCallback(() => {
        if (acceptEvent) {
            acceptEvent();
        }

        onClose();
    }, [ acceptEvent, onClose ]);

    return (
        <Modal
            isOpen={ isOpen }
            className={ cn('', {}, [ className ]) }
        >
            <div className={ classes.confirmWrapper }>
                <div className={ classes.confirmInfo }>
                    <p className={ classes.confirmTitle }>{ title }</p>
                    <p className={ classes.confirmDescription }>
                        { description }
                    </p>
                </div>
                <div className={ classes.confirmActions }>
                    <Button
                        className={ cn(classes.confirmButton, {}, [classes.cancelButton]) }
                        onClick={ handleCloseEvent }
                    >
                        { cancelButtonText }
                    </Button>
                    <Button
                        className={ cn(classes.confirmButton, {}, [classes.acceptButton]) }
                        onClick={ handleAcceptEvent }
                    >
                        { acceptButtonText }
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export const DialogConfirmationModal = React.memo(DialogConfirmationModalComponent);
