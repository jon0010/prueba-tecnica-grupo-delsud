import NavLink from "next/link";
import marvel from "../../../assets/marvel.png";
import { RiStarLine } from "react-icons/ri";
import Image from "next/image";

export function Links() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary row px-3 fw-semibold py-3 fs-5">
      <div className="container-fluid">
        <NavLink href="/">
          <Image
            src={marvel}
            className="navbar-brand"
            alt="logo"
            width={110}
            height={50}
          ></Image>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-start ms-3"
          id="navbarNav"
        >
          <form className="col-6 form-inline my-2 my-lg-0">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="🔍 Ingresá un heroe o comic"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-info ms-3" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          className="justify-content-end bg-body-tertiary"
          style={{ textDecoration: "none", border: "none" }}
        >
          Favoritos&nbsp;&nbsp;
          <RiStarLine className="fs-2 me-5 text-warning" />
        </button>
      </div>
    </nav>
  );
}
