import "./index.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./Board.js";
import Navbar from "./Navbar.js"
import Modal from "./Modal.js"

export default function App() {

    const [show_modal, set_show_modal] = useState(false);

    function toggleModal() {
        set_show_modal(!show_modal);
    }

    return (
        <Router>
            <div className="app-row">
                <Navbar 
                    click={() => toggleModal()}
                />
                <div className="grow">
                    { show_modal &&
                        <Modal 
                            title="pog"
                            body="pog body"
                            click={() => toggleModal()}
                        />
                    }
                    <Routes>
                        <Route path="/" element={<Board />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}