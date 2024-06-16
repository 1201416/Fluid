import { Component } from "react";
import './list.component.css';

type Props = {
    title: string;
    data:{
        id:string;
        column1Name: string;
        column2Owner: string;
    }[];
    custom: React.ReactNode;
    openModalToUpdate: (id: string, title: string) => void;
}

export default class List extends Component<Props>{
    render(){
        return(
            <div className="list_container">
                <div className="list_principal">
                    <div className="list_centrar">
                        <div className="list_top">
                            <div className="list_titulo">
                                <h3>{this.props.title}</h3>
                            </div>
                            {this.props.custom}
                        </div>
                        <div className="princ_lists">
                            <ul>
                                {Array.isArray(this.props?.data) && this.props?.data?.map((line, index) => (
                                    <li onClick={() => this.props.openModalToUpdate(line.id, line.column1Name)} key={index} className={`list li_${index}_1`}>
                                        <div className="col_md_1_list">
                                            <p>{"Board"}</p>
                                        </div>
                                        <div className="col_md_2_list">
                                            <h4>{line.column1Name}</h4>
                                            <p>{<i>Title</i>}</p>
                                        </div>
                                        <div className="col_md_2_list">
                                            <h4>{line.column2Owner}</h4>
                                            <p>{<i>Owner</i>}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}