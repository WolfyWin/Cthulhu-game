import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import {BoardView}                                    from './components/BoardView'
import {History as Game}                              from './components/History'
import React                                          from 'react'

const BoardGame = () => {
  return (
    <Router>
      <div className={"navBar"}>
        <ul>
          <li>
            <Link to="/" style={{display: "block", color: "#b0ecb3", textAlign: "center", padding: "14px 16px", fontSize: "1.6rem", textDecoration: "none"}}>
              Play
            </Link>
          </li>
          <li>
            <Link to="history" style={{display: "block", color: "#b0ecb3", textAlign: "center", padding: "14px 16px", fontSize: "1.6rem", textDecoration: "none"}}>
              History
            </Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<BoardView />} />
          <Route path="history" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export {BoardGame};
