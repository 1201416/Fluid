import React, { Component, useContext } from "react";
import Modal from "react-modal";
import Toast from "../toast";
import { createFluidContainer } from "../utils";
import boardsService from "../../services/BoardsService";
import { BoardData } from "../types/BoardData";

type Props = {
  onDataReceived: (data: State['boardData']) => void;
  user: {
    userDTO:{
      name: string,
      email: string,
      password: string
    }
    token: string;
  }
};

type State = {
  isModalOpen: boolean,
  boardData: {
    id: string,
    boardOwner: string,
    boardTitle: string,
    boardPermissions: string[],
    fluidId: string
  },
};

const defaultData = {
    id: "",
    boardOwner: "",
    boardTitle: "",
    boardPermissions: [],
    fluidId: ""
};

export default class CreateBoard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
      boardData: {...defaultData },
    };
  }
  sessionStorage= () =>{
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
        this.setState({

        })
    }
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
      boardData: {...defaultData},
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      boardData: {...defaultData},
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      boardData: {
        ...prevState.boardData,
        [name]: value,
      },
    }));
  };

  handleAddBoard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.boardData.boardTitle === "")
    {
      Toast.showFailure("Please fill all fields correctly.");
      return;
    }
    try {
        const container = createFluidContainer(this.props.user);
        const id = (await container).container.attach()
        boardsService.create(
          this.props.user.userDTO.email,
          this.state.boardData.boardTitle,
          await id
        ).then(
          (board: BoardData) =>{
            this.props.onDataReceived(board);
          },error =>{
            const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          Toast.showFailure(resMessage);
          }
        )
  
        Toast.showSuccess("Board created successfully.");
      } catch (error) {
        console.error("Error creating board:", error);
        Toast.showFailure("Error creating board. Please try again.");
      }
  
    this.closeModal();
  }

  render() {
    return (
      <div>
        <div className="list_add" onClick={this.openModal}>
          <p><i className="material-icons">add</i></p>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Create Building Modal"
          style={{
            content: {
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '260px',
              background: '#f48403'
            },
          }}
        >
          <form className="board" onSubmit={this.handleAddBoard}>
            <h2 className="board-title">Create Board</h2>
            <input
              type="text"
              name="boardTitle"
              value={this.state.boardData.boardTitle}
              onChange={this.handleInputChange}
              placeholder="Board Title"
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters, numbers, and spaces are allowed."
              maxLength={50}
            />
            <div className="wrapper-buttons">
              <button className="button form-submit-button" type="submit">Create</button>
              <button className="button form-close-button" type="button" onClick={this.closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
