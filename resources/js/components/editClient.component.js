import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';

class EditClient extends Component {

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

    async componentDidMount() {
        const { match } = this.props;

        const client = await fetch(`/api/clients/${match.params.id}`)
            .then(response => {
                return response.json();
            }).then(client => {
               return client
            });

        this.setState({ ...client });
    }

    update() {

        const { match, history } = this.props;

        fetch(`/api/clients/${match.params.id}`,
            {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(response => {
                return response.json();
            }).then( data => {
                history.push('/');
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
            <div className="edit-client container">
                <div className="form-row col-md-8">
                    <div className="form-group col-md-12">
                        <h2 style={{marginBottom: 20}}><b>Editar cliente</b></h2>
                    </div>

                    <div className="form-group col-md-6">
                        <label>Identificación</label>
                        <input required value={identity_card} onChange={(e) => this.setState({ identity_card: e.target.value })} type="text" placeholder="Identificación" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tipo de documento</label>
                        <select required onChange={(e) => this.setState({ type_documents: e.target.value })} className="form-control">
                            <option value={type_documents}>Actual: { type_documents }</option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Nombres</label>
                        <input required value={name} onChange={(e) => this.setState({ name: e.target.value })} type="text" placeholder="Nombres" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Apellidos</label>
                        <input required value={lastname} onChange={(e) => this.setState({ lastname: e.target.value })} type="text" placeholder="Apellidos" className="form-control"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label>Correo electrónico</label>
                        <input required value={email} onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="Correo electrónico" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Teléfono</label>
                        <input required value={phone} onChange={(e) => this.setState({ phone: e.target.value })} type="text" placeholder="Teléfono" className="form-control"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Direción</label>
                        <input required value={address} onChange={(e) => this.setState({ address: e.target.value })} type="text" placeholder="Direción" className="form-control"/>
                    </div>
                </div>
                <div>
                    <button onClick={() => this.props.history.push('/') } className="btn btn-danger">Cancelar</button>
                    <button disabled={disabled} onClick={() => this.update()} className="btn btn-primary">Guardar Cambios</button>
                </div>
                {
                    disabled ? <p>Por favor completa el formulario para poder continuar</p> : null
                }
            </div>
        )
	}
}

export default withRouter(EditClient);
