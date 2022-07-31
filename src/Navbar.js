import "./index.css";
import { getPath } from "./utils";

export default function Navbar(props) {

    return (
        <div className="nav">
            <div className="center-col">
                <div className="center-col">
                    <div className="logo-padding" />
                    <img 
                        src={require("./assets/chess-2-logo.png")} 
                        alt="logo" 
                        className="logo" 
                    />
                    <img src={ getPath("bear", null)} alt="logo" className="piece" />
                </div>
                <button onClick={ props.click }>
                    Poggers
                </button>
                <button>
                    Poggers 2
                </button>
            </div>
        </div>
    )
}