import "./index.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./Board.js";
import Rules from "./Rules.js";
import Navbar from "./Navbar.js"
// import Modal from "./Modal.js"
import PieceInfo from "./PieceInfo.js"
import WinInfo from "./WinInfo.js";

export default function App() {

    const [show_piece_info, set_show_piece_info] = useState(false);
    const [show_win_info, set_show_win_info] = useState(false);

    function togglePieceInfo() {
        if (show_win_info) {
            set_show_win_info(false);
        }
        set_show_piece_info(!show_piece_info);
    }

    function toggleWinInfo() {
        if (show_piece_info) {
            set_show_piece_info(false);
        }
        set_show_win_info(!show_win_info);
    }

    function closeModals() {
        set_show_piece_info(false);
        set_show_win_info(false);
    }

    return (
        <Router>
            <div className="app-row">
                <Navbar 
                    className="nav"
                    close_modals={() => closeModals()}
                    piece_info={() => togglePieceInfo()}
                    win_info={() => toggleWinInfo()}
                />
                <div className="grow">
                    { show_piece_info &&
                        <PieceInfo close={() => togglePieceInfo()}/>
                    }
                    { show_win_info &&
                        <WinInfo close={() => toggleWinInfo()} />
                    }
                    <Routes>
                        <Route path="/" element={<Board />} />
                        <Route path="/rules" element={<Rules />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}