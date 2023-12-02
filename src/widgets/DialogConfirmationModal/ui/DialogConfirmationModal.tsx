import cn from 'classnames';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
        <Dialog
            fullWidth
            maxWidth='sm'
            open={ isOpen }
            className={ cn( '', {}, [ className ] ) }
        >
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { description }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    onClick={ handleCloseEvent }
                >
                    { cancelButtonText }
                </Button>
                <Button
                    variant='contained'
                    onClick={ handleAcceptEvent }
                >
                    { acceptButtonText }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const DialogConfirmationModal = React.memo( DialogConfirmationModalComponent );
