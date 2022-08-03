import { win_desc } from "./utils.js";
import { Crown } from "@styled-icons/fa-solid";
import Modal from "./Modal.js";

export default function WinInfo(props) {
    let close = props.close;
    let body = 
        <div className="desc">
            <Crown className="info-piece" />
            { win_desc }
        </div>
    let title = "Win Condition";
    return (
        <Modal 
            title={ title }
            body={ body }
            close={ close } 
        />
    )
}