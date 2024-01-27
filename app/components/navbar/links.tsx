"use client";
import { useRouter } from "next/navigation";
import NavLink from "next/link";
import marvel from "../../assets/marvel.png";
import { RiStarLine } from "react-icons/ri";
import Image from "next/image";

export function Links() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary row px-3 fw-semibold py-3 fs-5">
      <div className="container-fluid">
        <NavLink href="/">
          <Image
            src={marvel}
            className="navbar-brand"
            alt="logo"
            width={undefined}
            style={{ width: "6em", height: "3em" }}
          ></Image>
        </NavLink>
        <button
          className="justify-content-end bg-body-tertiary"
          style={{ textDecoration: "none", border: "none" }}
          onClick={() => router.push("/favoritos")}
        >
          FAVS&nbsp;&nbsp;
          <RiStarLine className="fs-2 me-5 text-warning" />
        </button>
      </div>
    </nav>
  );
}
