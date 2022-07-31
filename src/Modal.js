import "./index.css";

export default function Modal(props) {
    return (
        <div className="modal">
            <div className="header">
                <div className="title">
                    {props.title}
                </div>
                <button className="close-button" onClick={ props.click }>
                    {"\u00d7"}
                </button>
            </div>
            <div className="body">
                {props.body}
            </div>
        </div>
    )
}