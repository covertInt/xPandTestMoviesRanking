import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import Header from "./components/Header.js";
import Modal from "./components/Modal";
import React, { useEffect, useState } from "react";
import reset from "./assets/icons/reset.svg";
import ListToInfinity from "./components/ListToInfinity";

function App() {
  const [filterType, setFilter] = useState("");
  const [showModalYears, setShowModalYears] = useState(false);
  const [listYears, setListYears] = useState([]);
  const [yearPressed, setYearPressed] = useState("");
  const [resetAction, setReset] = useState(false);

  useEffect(() => {
    fetch("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
      .then((data) => data.json())
      .then((data) => {
        const unique = [...new Set(data.content.map((item) => item.year))];
        const sorted = unique.sort((a, b) => b - a);
        setListYears(sorted);
      });
  }, []);

  return (
    <div>
      <Header></Header>

      <div className="Body">
        <div
          style={{
            fontFamily: "Roboto",
            color: "#386071",
            marginTop: 24,
            fontSize: 24,
            opacity: 1,
            textAlign: "left",
          }}
        >
          Movie ranking
        </div>

        <div style={{ flexDirection: "row", display: "flex", marginTop: 24 }}>
          <button
            style={{
              fontSize: 12,
              fontWeight: 300,
              width: 108,
              height: 30,
              backgroundColor: "white",
              color: "#78849E",
              borderRadius: 20,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#78849E66",
              fontFamily: "Roboto",
            }}
            onClick={() => setFilter("Top10Revenue")}
          >
            Top 10 Revenue
          </button>

          <button
            style={
              (showModalYears && filterType == "") ||
              (yearPressed !== "" && filterType == "")
                ? {
                    fontSize: 12,
                    fontWeight: 300,
                    marginLeft: 16,
                    width: 154,
                    height: 30,
                    backgroundColor: "#00BAFF",
                    color: "#012433",
                    borderRadius: 20,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#78849E66",
                    fontFamily: "Roboto",
                  }
                : {
                    fontSize: 12,
                    fontWeight: 300,
                    marginLeft: 16,
                    width: 154,
                    height: 30,
                    backgroundColor: "white",
                    color: "#78849E",
                    borderRadius: 20,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#78849E66",
                    fontFamily: "Roboto",
                  }
            }
            onClick={() => setShowModalYears(true)}
          >
            {yearPressed == "" && <div>Top 10 Revenue per year</div>}
            {yearPressed !== "" && <div>Top 10 Revenue {yearPressed}</div>}
            <Modal show={showModalYears} setShow={setShowModalYears}>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "Roboto",
                    color: "#78849EB9",
                    marginBottom: 18,
                  }}
                >
                  Select a year
                </div>
                {listYears.lenght != 0 &&
                  listYears.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          setYearPressed(item);
                        }}
                        key={index}
                        style={{
                          paddingBottom: 8,
                          fontSize: 14,
                          fontFamily: "Roboto",
                          color: "#536B7A",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
            </Modal>
          </button>
          {(yearPressed !== "" || filterType !== "") && (
            <div
              style={{
                marginLeft: 8,
                display: "flex",
              }}
              onClick={() => {
                setFilter("");
                setYearPressed("");
                setReset(true);
              }}
            >
              <img
                src={reset}
                style={{ justifyContent: "center", alignItems: "center" }}
              ></img>
            </div>
          )}
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            color: "#0B749B",
            fontSize: "10px",
            fontWeight: "bold",
            marginTop: "46px",
            fontWeight: "bold",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: "#0B749B",
          }}
        >
          <div style={{ width: "12%", textAlign: "center", height: 16 }}>
            RANKING
          </div>
          <div style={{ width: "37%", height: 16 }}>TITLE</div>
          <div style={{ width: "17%", height: 16 }}>YEAR</div>
          <div style={{ width: "22%", height: 16 }}>REVENUE</div>
          <div style={{ width: "12%", height: 16 }}></div>
        </div>

        <ListToInfinity
          filterType={filterType}
          yearPressed={yearPressed}
          setFilterType={setFilter}
          setYearPressed={setYearPressed}
          reset={resetAction}
          setReset={setReset}
        ></ListToInfinity>
      </div>
    </div>
  );
}

export default App;
