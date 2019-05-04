import React from "react";

    const NavHome = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h3 className="navbar-brand">Navbar</h3>
        {/* <Link to="/">Hightide</Link> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              {/* <Link to="/">Home</Link> */}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign Up!</a>
              {/* <Link className="nav-item" to="/profile" >Profile</Link> */}
            </li>
          </ul>
        </div>
      </nav>
    );

export default NavHome