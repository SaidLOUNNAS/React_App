import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            first_name: '',
            last_name: '',
            date_of_brith: '',
            sexe: '',
            student_level: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const user = doc.data();
                this.setState({
                    key: doc.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    date_of_brith: user.date_of_brith,
                    sexe: user.sexe,
                    student_level: user.student_level
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ user: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { first_name, last_name, date_of_brith, sexe, student_level } = this.state;

        const updateRef = firebase.firestore().collection('users').doc(this.state.key);
        updateRef.set({
            first_name,
            last_name,
            date_of_brith,
            sexe,
            student_level
        }).then((docRef) => {
            this.setState({
                key: '',
                first_name: '',
                last_name: '',
                date_of_brith: '',
                sexe: '',
                student_level: ''
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Modifier un utilisteur
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/`} class="btn btn-primary">Retour à la liste</Link></h4>
                        <form onSubmit={this.onSubmit}>

                            <div class="form-group">
                                <label for="first_name">Nom:</label>
                                <input type="text" class="form-control" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="Nom" />
                            </div>

                            <div class="form-group">
                                <label for="last_name">Prénom:</label>
                                <input type="text" class="form-control" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="Prénom" />
                            </div>

                            <div class="form-group">
                                <label for="date_of_brith">Date de Naissance</label>
                                <input type="text" class="form-control" name="date_of_brith" value={this.state.date_of_brith} onChange={this.onChange} placeholder="Date de Naissance" />
                            </div>

                            <div class="form-group">
                                <label for="sexe">Sexe:</label>
                                <input type="text" class="form-control" name="sexe" value={this.state.sexe} onChange={this.onChange} placeholder="Sexe" />
                            </div>

                            <div class="form-group">
                                <label for="student_level">Niveau d'étude :</label>
                                <input type="text" class="form-control" name="student_level" value={this.state.student_level} onChange={this.onChange} placeholder="Niveau d'étude" />
                            </div>

                            <button type="submit" class="btn btn-success">AJOUTER</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;