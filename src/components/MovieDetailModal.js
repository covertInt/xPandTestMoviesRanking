import React, { useState, useEffect } from "react";
import "../App.css";
import close from "../assets/icons/close.svg";
import "../index.css";

const MovieDetailModal = (props) => {
  const { item, show, setShow } = props;
  const [hoveredArrow, setChangeClosingArrow] = useState(false);
  const [listItem, setListItem] = useState();

  useEffect(() => {
    //fazer o get do endpoint já com o id

    //-------------------------------------------como fazer desaparecer o delay ----- duvida ---- o que estara mal implementado

    fetch(
      "http://movie-challenge-api-xpand.azurewebsites.net/api/movies/" +
        props.item.id
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setListItem(data);
        setChangeClosingArrow(false);
      });
  }, [show]);

  return show ? (
    <div className="modal-wrapper">
      <div className="modal-backdrop" />

      <div className="modal-boxButton">
        <div style={{ flexDirection: "column", display: "flex" }}>
          <div style={{ flexDirection: "row", display: "flex", height: 38 }}>
            {/* marginTop9 - martelo de Thor */}

            <div
              style={{
                width: "100%",
                fontWeight: 300,
                fontFamily: "Roboto",
                fontSize: 32,
                color: "#164E78",
                marginTop: 9,
                lineHeight: 0,
              }}
            >
              {props.item.title}
            </div>

            <div onClick={() => setShow(false)}>
              {hoveredArrow && (
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 8,
                      color: "#718FA2",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    CLOSE
                  </div>
                  <img
                    src={close}
                    onMouseEnter={() => setChangeClosingArrow(true)}
                    onMouseLeave={() => setChangeClosingArrow(false)}
                  />
                </div>
              )}
              {hoveredArrow == false && (
                <div>
                  <img
                    src={close}
                    onMouseEnter={() => setChangeClosingArrow(true)}
                    onMouseLeave={() => setChangeClosingArrow(false)}
                  />
                  <div
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 8,
                      color: "#718FA2",
                    }}
                  >
                    CLOSE
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              borderBottom: "2px solid #21B3CF",
              width: 52,
              height: 0,
              marginTop: 16,
              marginBottom: 16,
            }}
          ></div>

          {props.item.year && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Year
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {props.item.year}
              </div>
            </div>
          )}

          {listItem.genre && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Genre
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.genre}
              </div>
            </div>
          )}

          {listItem.description && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Description
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.description}
              </div>
            </div>
          )}

          <div style={{ flexDirection: "row", display: "flex" }}>
            {listItem.director && (
              <div style={{ width: "30%" }}>
                <div
                  style={{
                    color: "#78849EB9",
                    fontSize: 14,
                    fontFamily: "Roboto",
                  }}
                >
                  Director
                </div>
                <div
                  style={{
                    color: "#00BAFF",
                    fontSize: 16,
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    marginTop: 4,
                    marginBottom: 17,
                  }}
                >
                  {listItem.director}
                </div>
              </div>
            )}

            {listItem.actors && (
              <div style={{ width: "70%" }}>
                <div
                  style={{
                    color: "#78849EB9",
                    fontSize: 14,
                    fontFamily: "Roboto",
                  }}
                >
                  Actors
                </div>
                <div
                  style={{
                    color: "#00BAFF",
                    fontSize: 16,
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    marginTop: 4,
                    marginBottom: 17,
                  }}
                >
                  {listItem.actors}
                </div>
              </div>
            )}
          </div>

          {listItem.runtime && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Runtime
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.runtime}
              </div>
            </div>
          )}

          {listItem.rating && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Rating
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.rating}
              </div>
            </div>
          )}

          {listItem.votes && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Votes
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.votes}
              </div>
            </div>
          )}

          {props.item.revenue && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Revenue
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                ${props.item.revenue}
              </div>
            </div>
          )}
          {listItem.metascore && (
            <div>
              <div
                style={{
                  color: "#78849EB9",
                  fontSize: 14,
                  fontFamily: "Roboto",
                }}
              >
                Metascore
              </div>
              <div
                style={{
                  color: "#78849E",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  marginTop: 4,
                  marginBottom: 17,
                }}
              >
                {listItem.metascore}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieDetailModal;
