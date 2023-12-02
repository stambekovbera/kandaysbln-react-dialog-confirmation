import {
    DialogConfirmationContext,
    DialogConfirmationProvider,
    IDialogConfirmationContext,
    IDialogConfirmationOnOpenProps,
    IDialogConfirmationProps,
    useDialogConfirmation
} from './app/providers/DialogConfirmationProvider';
import { DialogConfirmationModal } from './widgets/DialogConfirmationModal';

export {
    DialogConfirmationContext,
    DialogConfirmationProvider,
    useDialogConfirmation,
    DialogConfirmationModal,
};

export type {
    IDialogConfirmationProps,
    IDialogConfirmationContext,
    IDialogConfirmationOnOpenProps
};
