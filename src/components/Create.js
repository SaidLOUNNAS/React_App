import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('users');
        this.state = {
            first_name: '',
            last_name: '',
            date_of_brith: '',
            sexe: '',
            student_level: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { first_name, last_name, date_of_brith, sexe, student_level } = this.state;

        this.ref.add({
            first_name,
            last_name,
            date_of_brith,
            sexe,
            student_level
        }).then((docRef) => {
            this.setState({
                first_name: '',
                last_name: '',
                date_of_brith: '',
                sexe: '',
                student_level: ''
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { first_name, last_name, date_of_brith, sexe, student_level } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">AJOUTER</h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/" className="btn btn-primary">Retour à la liste</Link></h4>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label htmlFor="first_name">Nom</label>
                                <input type="text" className="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="Nom" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="last_name">Prénom</label>
                                <input type="text" className="form-control" name="last_name" value={last_name} onChange={this.onChange} placeholder="Prenom" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date_of_brith">Date de Nissance</label>
                                <input type="date" className="form-control" name="date_of_brith" value={date_of_brith} onChange={this.onChange} placeholder="Date de Naissance" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="sexe">Sexe:</label>
                                <select className="form-control" name="sexe" value={sexe} onChange={this.onChange} placeholder="Sexe">
                                    <option selected>Homme</option>
                                    <option>Femme</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="student_level">Niveau d’étude</label>
                                <select className="form-control" name="student_level" value={student_level} onChange={this.onChange}>
                                    <option selected>Aucun diplôme</option>
                                    <option>BTS</option>
                                    <option>BAC</option>
                                    <option>Licence</option>
                                    <option>Master</option>
                                    <option>Ingénieur</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">AJOUTER</button>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

export default Create;