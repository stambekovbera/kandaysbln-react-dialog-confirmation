import ReactDOM from 'react-dom/client';
import { App } from "@/app/App.tsx";
import { DialogConfirmationProvider } from "@/app/providers/DialogConfirmationProvider";

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <DialogConfirmationProvider>
        <App/>
    </DialogConfirmationProvider>
);
