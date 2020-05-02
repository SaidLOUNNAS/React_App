import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { first_name, last_name, date_of_brith, sexe, student_level } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        first_name,
        last_name,
        date_of_brith,
        sexe,
        student_level
      });
    });
    this.setState({
      users
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


  delete(id) {
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      // this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Liste des utilisateurs
            </h3>

            <h6 class="float-right">
              <Link to="/create">  Ajouter</Link>
            </h6>
          </div>
          <div class="panel-body">

            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Date de Naissance</th>
                  <th> Sexe</th>
                  <th>Niveau d'étude</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr>
                    <td><Link to={`/show/${user.key}`}>{user.first_name}</Link></td>
                    <td>{user.last_name}</td>
                    <td>{user.date_of_brith}</td>
                    <td>{user.sexe}</td>
                    <td>{user.student_level}</td>
                    <td>
                      <td><Link to={`/edit/${user.key}`} ><button class="btn btn-success"> Modifier </button> </Link> </td>
                      <td><button onClick={this.delete.bind(this, user.key)} class="btn btn-danger">supprimer</button></td>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;