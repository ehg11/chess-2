import "./index.css";
import { Chess } from "@styled-icons/fa-solid";
import { Crown } from "@styled-icons/fa-solid";
import { DocumentText } from "@styled-icons/heroicons-solid"
import { GithubOutline } from "@styled-icons/evaicons-outline"; 
import { getPath } from "./utils";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {

    const navigate = useNavigate();

    function goToHome() {
        props.close_modals();
        navigate("/");
    }

    function goToRules() {
        props.close_modals();
        navigate("/rules");
    }

    function openGithub() {
        let win = window.open("https://github.com/ehg11/chess-2", "_blank");
        if (win !== null) {
            win.focus();
        }
    }

    return (
        <div className="nav">
            <div className="center-col">
                <div className="center-col" onClick={ () => goToHome() }>
                    <div className="logo-padding" />
                    <img 
                        src={require("./assets/chess-2-logo.png")} 
                        alt="logo" 
                        className="logo" 
                    />
                    <img src={ getPath("bear", null)} alt="logo" className="piece" />
                </div>
                <div>
                    <Chess className="navbar-button" onClick={ props.piece_info }/>
                </div>
                <div>
                    <Crown className="navbar-button" onClick={ props.win_info } /> 
                </div>
                <div>
                    <DocumentText className="navbar-button" onClick={ () => goToRules() }/>
                </div>
                <div>
                    <GithubOutline className="navbar-button"
                        onClick={() => openGithub()}
                    />
                </div>
            </div>
        </div>
    )
}