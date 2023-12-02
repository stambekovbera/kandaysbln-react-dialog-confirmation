import {
    DialogConfirmationContext,
    IDialogConfirmationContext,
    IDialogConfirmationOnOpenProps,
    IDialogConfirmationProps
} from '../DialogConfirmationContext';
import { functionCallErrorHandler } from '@/shared/lib/errorHandlers/errorsHandlers';
import { useContext } from 'react';

type IUseDialogConfirmationResultForDialog =
    IDialogConfirmationProps
    & Required<Pick<IDialogConfirmationContext, 'onCloseDialogConfirmation'>>;

type IUseDialogConfirmationResult = Required<Pick<IDialogConfirmationContext, 'onOpenDialogConfirmation'>>;

type HookResult<T extends boolean> = T extends true ? IUseDialogConfirmationResultForDialog : IUseDialogConfirmationResult;

export const useDialogConfirmation = <B extends boolean>(forDialogConfirmation?: B): HookResult<B> => {
    const {
        params,

        onOpenDialogConfirmation,
        onCloseDialogConfirmation
    } = useContext( DialogConfirmationContext );

    const handleOpen = (params: Partial<IDialogConfirmationOnOpenProps>) => {
        if (onOpenDialogConfirmation) {
            onOpenDialogConfirmation( params );

            return;
        }

        functionCallErrorHandler( 'handleOpen', 'useDialogConfirmation.ts', 'Function "onOpenDialogConfirmation" is undefined in: ' );

        return;
    };

    const handleClose = () => {
        if (onCloseDialogConfirmation) {
            onCloseDialogConfirmation();

            return;
        }

        functionCallErrorHandler( 'handleClose', 'useDialogConfirmation.ts', 'Function "onCloseDialogConfirmation" is undefined in: ' );

        return;
    };

    return forDialogConfirmation ? {
        onCloseDialogConfirmation: handleClose,
        acceptEvent: params?.acceptEvent || null,
        isOpen: params?.isOpen || false,
        title: params?.title || '',
        acceptButtonText: params?.acceptButtonText || '',
        description: params?.description || '',
        cancelEvent: params?.cancelEvent || null,
        cancelButtonText: params?.cancelButtonText || '',
    } as HookResult<B> : {
        onOpenDialogConfirmation: handleOpen,
    } as HookResult<B>;
};
