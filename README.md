## [Документация на русском](https://github.com/stambekovbera/kandaysbln-react-dialog-confirmation/tree/new-readme/documentation/ru)

# Installation

## NPM

```
npm install kandaysbln-react-dialog-confirmation
```

## YARN

```
yarn add kandaysbln-react-dialog-confirmation
```

------------

## Connecting the provider

### 1. Install the package using NPM or YARN as shown above

### 2. Import the provider and wrap your application with it

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

## Connecting the Dialog Component

### 1. Importing the component from the package

Import components from a package, and also import styles

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DialogConfirmationProvider, DialogConfirmationModal } from 'kandaysbln-react-dialog-confirmation';
import 'kandaysbln-react-dialog-confirmation/kandaysbln-react-dialog-confirmation.css'

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <DialogConfirmationProvider>
            <App/>
            <DialogConfirmationModal/>
        </DialogConfirmationProvider>
    </React.StrictMode>,
);
```

### 2. Creating your custom component and importing it

To develop your own component, you need to import the **useDialogConfirmation** hook. When using this hook, pass **true
** as an
argument if it's used in a component that will be used as a confirmation dialog. In other contexts, pass **false**.

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

Import the created component

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

## Example of Usage

To use the confirmation functionality, import the **useDialogConfirmation** hook. When calling this hook, pass **false**
as an
argument. This component will return the **onOpenDialogConfirmation** method, which should be used in functions where
confirmation of an action is required

```tsx
import { useDialogConfirmation } from 'kandaysbln-react-dialog-confirmation';

function App() {
    const {
        onOpenDialogConfirmation
    } = useDialogConfirmation( false );

    const showDialogConfirmation = (isConfirm = false) => {
        if (!isConfirm) {
            onOpenDialogConfirmation( {
                title: 'Action confirmation',
                acceptEvent: showDialogConfirmation.bind( null, true ) // first argument context is null, second argument isConfirm is true
            } );

            return;
        }

        alert( 'Action confirmed!' );

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
