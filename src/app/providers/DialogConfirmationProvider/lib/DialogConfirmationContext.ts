import { createContext } from 'react';

export type IDialogConfirmationOnOpenProps = Partial<Omit<IDialogConfirmationProps, 'isOpen'>>;

export interface IDialogConfirmationProps {
    isOpen: boolean;
    title: string;
    description: string;
    acceptButtonText: string;
    cancelButtonText: string;
    acceptEvent: ( () => void ) | null;
    cancelEvent: ( () => void ) | null;
}

export interface IDialogConfirmationContext {
    params?: IDialogConfirmationProps;
    onOpenDialogConfirmation?: (values: Partial<IDialogConfirmationOnOpenProps>) => void;
    onCloseDialogConfirmation?: () => void;
}

export const DialogConfirmationContext = createContext<IDialogConfirmationContext>( {} );

