# Установка

## NPM

```
npm install kandaysbln-react-dialog-confirmation
```

## YARN

```
yarn add kandaysbln-react-dialog-confirmation
```

------------

## Подключение провайдера

### 1. Установите пакет с помощью NPM или YARN, как показано выше.

### 2. Импортируйте провайдер и оберните им приложение

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DialogConfirmationProvider } from 'kandaysbln-react-dialog-confirmation';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <DialogConfirmationProvider>
            <App/>
        </DialogConfirmationProvider>
    </React.StrictMode>,
);
```

## Подключение компонента диалогового окна

### 1. Импортирование компонента из пакета

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DialogConfirmationProvider, DialogConfirmationModal } from 'kandaysbln-react-dialog-confirmation';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <DialogConfirmationProvider>
            <App/>
            <DialogConfirmationModal/>
        </DialogConfirmationProvider>
    </React.StrictMode>,
);

```

### 2. Создание собственного компонента и его последующий импорт

Для разработки собственного компонента необходимо выполнить импорт хука useDialogConfirmation. При вызове данного хука
необходимо передать аргументом значение true, если он применяется в компоненте, который будет использоваться как
подтверждающее диалоговое окно. В случае использования хука в других контекстах следует передавать значение false.

```tsx
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDialogConfirmation } from 'kandaysbln-react-dialog-confirmation';

const CustomDialogConfirmation: React.FC = () => {
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

export default CustomDialogConfirmation;
```

Импорт созданного выше компонента

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DialogConfirmationProvider } from 'kandaysbln-react-dialog-confirmation';
import CustomDialogConfirmation from "./components/CustomDialogConfirmation.tsx";

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <DialogConfirmationProvider>
            <App/>
            <CustomDialogConfirmation/>
        </DialogConfirmationProvider>
    </React.StrictMode>,
);
```

## Пример использования

Для использования функционала подтверждения необходимо импортировать хук useDialogConfirmation. При вызове данного
хука передайте аргументом значение false. Этот компонент вернет метод onOpenDialogConfirmation, который следует
применять в функциях, где требуется подтверждение действия.

```tsx
import { useDialogConfirmation } from 'kandaysbln-react-dialog-confirmation';

function App() {
    const {
        onOpenDialogConfirmation
    } = useDialogConfirmation( false );

    const showDialogConfirmation = (isConfirm = false) => {
        if (!isConfirm) {
            onOpenDialogConfirmation( {
                title: 'Подтверждение действия',
                acceptEvent: showDialogConfirmation.bind( null, true ) // первый аргумент контекст - null, второй аргумент isConfirm - true
            } );

            return;
        }

        alert( 'Действие было подтверждено!' );

        return;
    };

    return (
        <>
            <button onClick={ () => showDialogConfirmation( false ) }>
                Открыть
            </button>
        </>
    );
}

export default App
```
