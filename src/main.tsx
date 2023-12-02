import ReactDOM from 'react-dom/client';
import { DialogConfirmationProvider } from '@/app/providers/DialogConfirmationProvider';
import { App } from './app/App';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <DialogConfirmationProvider>
        <App/>
    </DialogConfirmationProvider>
);
