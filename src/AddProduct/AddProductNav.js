import React from "react";
import { Link } from "react-router-dom";
import './style.css';
function AddProductNav() {
  return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/AddProductPage">
            Add Product
          </Link>
          <form className="d-flex">
            <div className="d-flex"></div>
            <Link className="navbar-brand" to="/Home">
              <button type="button" className="btn btn-primary btn-sm">
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </nav>
  );
}
export default AddProductNav;
