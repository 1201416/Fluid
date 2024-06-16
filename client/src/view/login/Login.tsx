import React, { Component, FormEvent } from 'react';
import Toast from '../toast';
import { Navigate } from 'react-router-dom';
import './login.component.css'
import usersService from '../../services/UsersService';
import { IUserData } from '../types/UserData';
type Props = {
    onDataReceived: (data: IUserData)=> void
};

type State = {
  redirect: string | null;
  isRegisterModalOpen: boolean;
  userData: {
    name: string;
    email: string;
    password: string;
  }
};

export default class Login extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    
        this.state = {
          redirect: null,
          isRegisterModalOpen: false,
          userData: {
            name: "",
            email: "",
            password: "",
          }
        };
    }
  setUserDataToSession = (user: IUserData) => {
      sessionStorage.setItem('user', JSON.stringify(user));
  }

  handleLogin = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
          usersService.login(
              this.state.userData.email,
              this.state.userData.password
          ).then(
              (user: IUserData) => {
                  this.props.onDataReceived(user);
                  this.setUserDataToSession(user);
                  this.setState({
                      userData: {
                          name: user.userDTO.name,
                          email: user.userDTO.email,
                          password: user.userDTO.password
                      },
                      redirect: "/boards"
                  });
                  Toast.showSuccess("User signed in");
              
            }, error =>{
              const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

              Toast.showFailure(resMessage);
            }
          )
      } catch (e) {
          Toast.showFailure("Invalid password");
      }
  }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                [name]: value
            }
        }));
    };

    render() {
        if (this.state.redirect) {
          return <Navigate to={this.state.redirect} />
        }
    
        return (
            <div className="login">
              <div className="wrapper-form">
                <h3 className="login-title">Devscope Boards</h3>
                <form onSubmit={this.handleLogin}>
                  <input
                      type="email"
                      name="email"
                      value={this.state.userData.email}
                      onChange={this.handleChange}
                      placeholder="Email"
                      required
                  />
                  <br />
                  <input
                      type="password"
                      name="password"
                      value={this.state.userData.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                      required
                  />
                  <button className="login-button" type="submit">Login</button>
                  <div className="login-link">
                    <a href="/register">Don't have an account?</a>
                  </div>
                </form>
              </div>
            </div>
        );
      }
}