// HomeNav.js
import React from "react";
import { Link } from "react-router-dom";

function HomeNav({ handleMassDelete, selectedProducts }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="https://neon-smakager-71424f.netlify.app/Home">
          Home
        </Link>

        <form className="d-flex">
          <Link className="navbar-brand" to="https://neon-smakager-71424f.netlify.app/AddProductPage">
            <button type="button" className="btn btn-primary btn-sm">
              Add
            </button>
          </Link>

          <div className="d-flex"></div>
          <Link className="navbar-brand">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleMassDelete}
            disabled={!Array.isArray(selectedProducts)}
          >
            Mass delete
          </button>
          </Link>
        </form>
      </div>
    </nav>
  );
}

export default HomeNav;
