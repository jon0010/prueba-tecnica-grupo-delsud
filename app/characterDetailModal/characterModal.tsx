import React from "react";
import Image from "next/image";
import { ICharacterDetail } from "../interfaces/index";
import { Bangers } from "next/font/google";
import styles from "../cardCharacter/card.module.css";

interface CharacterModalProps {
  characterDetails: ICharacterDetail;
  onClose: () => void;
}

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const CharacterModal: React.FC<CharacterModalProps> = ({
  characterDetails,
  onClose,
}) => {
  return (
    <dialog
      className="modal fade show"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(103, 103, 103, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        border: "none",
      }}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="characterModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" style={{ maxWidth: "80%" }}>
        <div className="modal-content" style={{ overflow: "hidden" }}>
          <div className="modal-header">
            <h5
              className={`modal-title ${bangers.className} ${styles["titleDetail"]} fs-1 text-warning`}
              id="characterModal"
            >
              {characterDetails.name}
            </h5>
          </div>
          <div className="col-6 mx-auto mt-3 text-center">
            <Image
              className="img-fluid rounded border border-2 border-danger"
              src={`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`}
              alt={characterDetails.name}
              width={300}
              height={250}
            />
          </div>
          <div
            className="modal-body"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="col-6 text-center mx-auto">
              <p>
                {characterDetails.description || "Description not available"}
              </p>
            </div>
            <h5
              className={`modal-title ${bangers.className} ${styles["titleDetail"]} fs-1 text-warning mb-4`}
            >
              Comic Book Appearances
            </h5>
            <ul style={{ listStyle: "none" }}>
              {characterDetails.comicsDetails ? (
                characterDetails.comicsDetails.map((comic, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="row mb-5 border border-4 p-3 me-2 rounded"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="col-3">
                        {" "}
                        <Image
                          className="img-fluid border border-2 border-danger rounded"
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={comic.title}
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className="col-8">
                        {" "}
                        <li className="mt-5 d-flex justify-content-start">
                          {comic.title}
                        </li>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <li>No comics details available</li>
              )}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CharacterModal;
