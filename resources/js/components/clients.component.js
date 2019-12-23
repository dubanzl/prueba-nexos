import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class Clients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            show: false,
            showTransactions: false,
            accounts: [],
            transactions: [],
            clientId: null,
            message: false,
        }
    }

     handleClose (){
         this.setState({ show: false, showTransactions: false, accounts: [], clientId: null})
     };

    handleShow() {
        this.setState({ show: true });
    }

    handleShowTransactions() {
        this.setState({ showTransactions: true });
    }

    async componentDidMount() {

        const clients = await fetch('/api/clients')
            .then(response => {
                return response.json();
            }).then(clients => {
               return clients
            });

        this.setState({ clients });
    }

    async getAccounts(clientId) {

        const accounts = await fetch(`/api/accounts/${clientId}`)
        .then(response => {
            return response.json();
        }).then(accounts => {
            return accounts;
        });

        this.handleShow();
        this.setState({ accounts, clientId });
    }

    async changeStatusAccount(status, accountId) {
        fetch(`/api/accounts/${accountId}`,
            {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ account_status: status })
            });
    }

    async getTransaciones(clientId){
        console.log(clientId);
        const transactions = await fetch(`/api/transactions/${clientId}`)
        .then(response => {
            return response.json();
        }).then(transactions => {
            return transactions;
        });

        this.handleShowTransactions();
        this.setState({ transactions });
    }

    async generateAccount(clientId, identity_card) {

        fetch('/api/accounts/',
            {
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identity_card,
                    clientId,
                })
            }).then((response) => {
                this.setState({ message: true });

                setTimeout(() => {
                    this.setState({ message: false });
                }, 3000);
            });

    }

	render() {
        const { clients, show, accounts, message, transactions, showTransactions } = this.state;

        return(
            <div className="clients">
                <div className="container">
                    {
                        message ? <p> Se ha generado correctamente la cuenta de ahorros</p> :null
                    }
                    <button onClick={() => { this.props.history.push('/registrar-cliente'); }} className="btn btn-primary"><i className="fas fa-user-plus"></i> Añadir Cliente</button>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            clients.map((client) => {
                                return (
                                    <div key={client.id} className="client-item col-sm-12 col-md-6 col-lg-4">
                                        <div className="client-box">
                                            <div className="dropdown client-options">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-cog"></i>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" onClick={() => { this.props.history.push(`/editar/cliente/${client.id}`); }} >Editar cliente</a>
                                                    <a className="dropdown-item" onClick={() => this.getAccounts(client.id)}>Ver cuentas de ahorros</a>
                                                    <a className="dropdown-item" onClick={() => this.props.history.push(`realizar-transaccion/cliente/${client.id}`) }>Realizar transación</a>
                                                    <a className="dropdown-item" onClick={() => this.generateAccount(client.id, client.identity_card) }>Generar cuenta de ahorros</a>
                                                    <a className="dropdown-item" onClick={() => this.getTransaciones(client.id) }>Ver historial transaciónes</a>
                                                </div>
                                            </div>
                                            <div className="client-header">
                                                <i className="fas fa-user"></i>
                                                <div>
                                                    <p>Nombre Cliente</p>
                                                    <p>{ client.name } { client.lastname } </p>
                                                </div>
                                            </div>
                                            <p><span>Correo&nbsp; </span> { client.email }</p>
                                            <p><span>Documento&nbsp; </span> { client.type_documents } { client.identity_card }</p>
                                            <p><span>Telefono&nbsp; </span> { client.phone }</p>
                                            <p><span>Direción&nbsp; </span> { client.address } </p>
                                        </div>
                                    </div>
                                );
                            })
                        }

                        <Modal show={showTransactions} onHide={() => this.handleClose} animation={false}>
                            <Modal.Header>
                            <Modal.Title>historial de transaciónes</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    transactions.map((transactions) => {
                                        const type_transaction = transactions.type_transaction == 'C' ? 'Consignación' : 'Retiro';
                                        return (
                                            <div key={transactions.id}>
                                                <h5><b>Numero de Cuenta:</b> {transactions.number_account}</h5>
                                                <p><b>Valor de la transación:</b> { transactions.amount} </p>
                                                <p><b>Fecha de la transación:</b> { transactions.created_at} </p>
                                                <p><b>Tipo transación </b>: {type_transaction} </p>
                                                <p><b>Descripción</b>: { transactions.description } </p>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Cerrar
                            </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={show} onHide={() => this.handleClose} animation={false}>
                            <Modal.Header>
                            <Modal.Title>Cuentas de Ahorros</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    accounts.map((account) => {
                                        const status = account.account_status == 1 ? true : false;
                                        return (
                                            <div key={account.account_number}>

                                                <h5><b>Numero de Cuenta:</b> {account.account_number}</h5>
                                                <p>Saldo actual: { account.available_balance} </p>
                                                <BootstrapSwitchButton
                                                    checked={status}
                                                    height={25}
                                                    width={100}
                                                    onlabel='Activa'
                                                    offlabel='Inactiva'
                                                    onChange={(checked) => {
                                                        this.changeStatusAccount(checked, account.id);
                                                    }}
                                                />
                                                <hr />
                                            </div>
                                        )
                                    })
                                }

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Cerrar
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        )
	}
}

export default withRouter(Clients);
