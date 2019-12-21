import Clients from './components/clients.component';
import RegisterClient from './components/registerClient.component'
import EditClient from './components/editClient.component'
import MakeTransaction from './components/makeTransaction.component'

const routes = [
    {
        path: '/registrar-cliente',
        exact: true,
        component: RegisterClient,
    },
    {
        path: '/editar/cliente/:id',
        exact: true,
        component: EditClient,
    },
    {
        path: '/realizar-transaccion/cliente/:id',
        exact: true,
        component: MakeTransaction,
    },
    {
        path: '/',
        exact: true,
        component: Clients,
    },
];

export default routes;
