import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _, { isEmpty } from 'lodash'

class MakeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            type_documents: '',
            type_transaction: '',
            identity_card: '',
            available_balance: 0,
            description: '',
            accounts: [],
            account: {
                is_firstime: 0,
            },
        }
    }

    async componentDidMount() {
        const { match } = this.props;

        const client = await fetch(`/api/clients/${match.params.id}`)
            .then(response => {
                return response.json();
            }).then(client => {
               return client
            });



        const accounts = await fetch(`/api/accounts/${match.params.id}`)
        .then(response => {
            return response.json();
        }).then(accounts => {
            return accounts;
        });

        this.setState({ ...client, accounts });
    }


    setAccount(accountNumber) {
        const { accounts, account } = this.state;

        if (!isEmpty(accountNumber)) {
            const account = _.find(accounts, (account) => {
                return account.account_number === accountNumber;
            });

            if (account.is_firstime == 1) {
                this.setState({ account, type_transaction: 'C', available_balance: 100000 });
            } else {
                this.setState({ account });
            }

        } else {

            this.setState({ account: { is_firstime: 0 } });
        }
    }

    makeTransaction() {
        const {  type_transaction, account, description, available_balance} = this.state;
        const { match } = this.props;

        fetch('/api/transactions/',
            {
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type_transaction,
                    number_account: account.account_number,
                    description,
                    is_firstime: account.is_firstime,
                    available_balance,
                    old_available_balance: account.available_balance,
                    clientId: match.params.id,
                    accountId: account.id,
                })
            }).then(response => {
                this.props.history.push('/');
            });

    }


	render() {
        const { name, lastname, type_documents, identity_card, accounts, account, available_balance, type_transaction, description} = this.state;

        let disabled = true;

        if (isEmpty(account.account_number) || isEmpty(type_transaction) || (available_balance) == 0 || isEmpty(description)) {
            disabled = true;
        } else {
            disabled = false;
        }


        return(
            <div className="register-account container">
                <div className="form-row col-md-8">
                    <div className="form-group col-md-12">
                        <h2 style={{marginBottom: 20}}><b>Realizar transacción</b></h2>
                        <h4> { name } { lastname } </h4>
                        <h6> {type_documents} {identity_card} </h6>
                    </div>

                    <div className="form-group col-md-6">
                        <label><b>Monto/Cantidad</b></label>
                        <input value={account.is_firstime == 1 ? 100000 : available_balance } disabled={account.is_firstime == 1 ? true : false} onChange={(e) => this.setState({ available_balance: e.target.value })} type="number" placeholder="Monto/Cantidad" className="form-control"/>
                        {
                            account.is_firstime == 1 ? <span> Como es la primera vez, debes activarla con 100 mil obligatorios</span> : null
                        }
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Tipo de transacción</b></label>
                        {
                             account.is_firstime == 1
                                ? (
                                    <select onChange={ (e) => this.setState({ type_transaction: e.target.value})} className="form-control">
                                        <option value="C">Consignación</option>
                                    </select>
                                )
                                : (
                                    <select onChange={ (e) => this.setState({ type_transaction: e.target.value})} className="form-control">
                                        <option>Seleccione tipo transacción</option>
                                        <option value="C">Consignación</option>
                                        <option value="R">Retiro</option>
                                    </select>
                                )
                        }
                        {
                            account.is_firstime == 1 ? <span> Como es la primera vez, debe activarla con consignando</span> : null
                        }

                    </div>
                    <div className="form-group col-md-12">
                        <label><b>Seleccione cuenta de ahorros</b></label>
                        <select onChange={(e) => this.setAccount(e.target.value) } className="form-control">
                            <option value="">Seleccione cuenta de ahorros</option>
                            {
                                accounts.map((account) => {
                                    return (
                                        <option key={account.account_number} value={account.account_number}> { account.account_number } </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <label><b>Descripción</b></label>
                        <textarea onChange={(e) => this.setState({ description: e.target.value })} placeholder="Descripción" className="form-control" />
                    </div>

                    <div className="form-group col-md-12">
                        <button onClick={() => this.props.history.push('/') } className="btn btn-danger">Cancelar</button>
                        <button disabled={disabled} style={{marginLeft:10}} onClick={() => this.makeTransaction()} className="btn btn-primary">Realizar transacción</button>
                    </div>
                    {
                        disabled ? <p>Por favor completa el formulario para poder continuar</p> : null
                    }
                </div>
            </div>
        )
	}
}

export default withRouter(MakeTransaction);
