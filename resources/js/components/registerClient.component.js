import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {isEmpty} from 'lodash';

class RegisterClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            lastname: '',
            address: '',
            phone: '',
            type_documents: '',
            identity_card: '',
        }
    }

    register() {
        fetch('api/clients/',
            {
                method:'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(response => {
                this.props.history.push('/');
            });
    }

	render() {

        const { name, email, lastname, address, phone, type_documents, identity_card } = this.state;


        let disabled = true;

        if (isEmpty(name) || isEmpty(email) || isEmpty(lastname) || isEmpty(address) || isEmpty(phone) || isEmpty(type_documents) || isEmpty(identity_card)) {
            disabled = true;
        } else {
            disabled = false;
        }

        return(
            <div className="register-client container">
                <div className="form-row col-md-8">
                    <div className="form-group col-md-12">
                        <h2 style={{marginBottom: 20}}><b>Registrar cliente</b></h2>
                    </div>

                    <div className="form-group col-md-6">
                        <label><b>Identificación</b></label>
                        <input required onChange={(e) => this.setState({ identity_card: e.target.value })} type="text" placeholder="Identificación" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Tipo de documento</b></label>
                        <select required onChange={(e) => this.setState({ type_documents: e.target.value })} className="form-control">
                            <option>Seleccione tipo de documento</option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Nombres</b></label>
                        <input required onChange={(e) => this.setState({ name: e.target.value })} type="text" placeholder="Nombres" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Apellidos</b></label>
                        <input required onChange={(e) => this.setState({ lastname: e.target.value })} type="text" placeholder="Apellidos" className="form-control"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label><b>Correo electrónico</b></label>
                        <input required onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="Correo electrónico" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Teléfono</b></label>
                        <input required onChange={(e) => this.setState({ phone: e.target.value })} type="text" placeholder="Teléfono" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label><b>Direción</b></label>
                        <input required onChange={(e) => this.setState({ address: e.target.value })} type="text" placeholder="Direción" className="form-control"/>
                    </div>
                </div>
                <div className="buttons-actions form-group col-md-12">
                    <button onClick={() => this.props.history.push('/') } className="btn btn-danger">Cancelar</button>
                    <button disabled={disabled} style={{marginLeft:10}} onClick={() => this.register()} className="btn btn-primary">Registrar Cliente</button>
                </div>

                {
                    disabled ? <p>Por favor completa el formulario para poder continuar</p> : null
                }

            </div>
        )
	}
}

export default withRouter(RegisterClient);
