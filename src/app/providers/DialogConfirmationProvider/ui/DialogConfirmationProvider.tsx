import React from 'react';
import {
    DialogConfirmationContext,
    IDialogConfirmationContext,
    IDialogConfirmationOnOpenProps,
    IDialogConfirmationProps
} from '../lib/DialogConfirmationContext.ts';

interface IDialogConfirmationProviderProps {
    children: React.ReactNode;
}

const initialState: IDialogConfirmationProps = {
    isOpen: false,
    title: 'Подтверждение',
    description: 'Вы действительно хотите сделать это?',
    cancelButtonText: 'Отменить',
    cancelEvent: null,
    acceptButtonText: 'Подтвердить',
    acceptEvent: null,
};

let timeout: ReturnType<typeof setTimeout> | null = null;

export const DialogConfirmationProvider: React.FC<IDialogConfirmationProviderProps> = (props) => {
    const {
        children
    } = props;

    const [ params, setParams ] = React.useState<IDialogConfirmationProps>( initialState );

    const onOpenDialogConfirmation = React.useCallback( (values: Partial<IDialogConfirmationOnOpenProps>) => {
        setParams( () => ( {
            ...params,
            ...values,
            isOpen: true,
        } ) );
    }, [ params, setParams ] );

    const onCloseDialogConfirmation = React.useCallback( () => {
        if (timeout) {
            clearTimeout( timeout );
            timeout = null;
        }

        setParams( () => ( {
            ...params,
            isOpen: false,
        } ) );

        timeout = setTimeout( () => {
            setTimeout( () => initialState );
        }, 500 );
    }, [ params, setParams ] );

    const providerValue = React.useMemo<IDialogConfirmationContext>( () => ( {
        params,
        onOpenDialogConfirmation,
        onCloseDialogConfirmation
    } ), [ onCloseDialogConfirmation, onOpenDialogConfirmation, params ] );

    return (
        <DialogConfirmationContext.Provider value={ providerValue }>
            { children }
        </DialogConfirmationContext.Provider>
    );
};
