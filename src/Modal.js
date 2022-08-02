import "./index.css";
import { Close, ArrowBack } from "@styled-icons/material-rounded";

export default function Modal(props) {
    let back = props.back;

    return (
        <div className="modal">
            <div className="header">
                { back && 
                    <button className="back-button" onClick={props.back_click}>
                        <ArrowBack />
                    </button>
                }
                <div className="title">
                    {props.title}
                </div>
                <button className="close-button" onClick={ props.close }>
                    <Close />
                </button>
            </div>
            <div className="body">
                {props.body}
            </div>
        </div>
    )
}