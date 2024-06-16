import {Component, FormEvent} from "react";
import './register.component.css';
import Toast from "../toast";
import usersService from "../../services/UsersService";
import { IUserData } from "../types/UserData";
import { Navigate } from "react-router-dom";

type Props = {
    onDataReceived: (data: IUserData)=> void
};

type State = {
    redirect: string | null;
    name: string;
    email: string;
    password: string;
};

class Register extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: null,
            name: "",
            email: "",
            password: ""
        };
    };

    setUserDataToSession = (user: IUserData) => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            usersService.register(
                this.state.name,
                this.state.email,
                this.state.password
            ).then(
                (user: IUserData) =>{
                    this.props.onDataReceived(user);
                    this.setUserDataToSession(user);
                    Toast.showSuccess("User registered successfully");
                    this.setState({
                        redirect: "/boards"
                    });
                }, error =>{
                    const resMessage =
              (error.response &&
                  error.response.data &&
                   (error.response.data.message || error.response.data.error))||
              error.message ||
              error.toString();
                Toast.showFailure(resMessage)
                }
            )
        } catch (e: any) {
            Toast.showFailure(e.message);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        return (
            <div className="register">
                <div className="wrapper-form">
                    <h1 className="register-title">Register</h1>
                    <form onSubmit={this.handleRegister} className="register-form">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                                placeholder={"Name"}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                                placeholder={"Email"}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                placeholder={"Password"}
                            />
                        </div>
                        <button type="submit" className="register-button">
                            Register
                        </button>
                        <div className="login-link">
                            <a href="/login">Already have an account?</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;