import React, { useState, useEffect, useRef } from "react";
import { getList, getListPage } from "../apiCalls/getList";
import eye from "../assets/icons/eye.svg";
import MovieDetailModal from "./MovieDetailModal";
import Modal from "./Modal";
import "../index.css";

const ListToInfinity = (props) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [listItem, setListItem] = useState([]);
  const {
    yearPressed,
    filterType,
    setFilterType,
    setYearPressed,
    setReset,
    reset,
  } = props;

  useEffect(() => {
    if (yearPressed != undefined && yearPressed != null && yearPressed != "") {
      fetch("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
        .then((data) => data.json())
        .then((data) => {
          const filteredByYear = data.content.filter(function (e) {
            return e.year === yearPressed;
          });

          var sortedArray = filteredByYear;

          let sorted1 =
            sortedArray &&
            sortedArray.sort((a, b) => b.revenue - a.revenue).splice(0, 10);

          setList(sorted1);
          setFilterType("");
        });
    }
  }, [yearPressed]);

  useEffect(() => {
    if (filterType === "Top10Revenue") {
      //sortby na querie string nao funcional
      //sorteby do array do state --- TODO

      fetch("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
        .then((data) => data.json())
        .then((newList) => {
          const sorted = newList.content
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

          setList(sorted);
          setYearPressed("");
        });
    }
  }, [filterType]);

  useEffect(() => {
    //fazer o get do endpoint já com a pagina e o numero de items
    fetch(
      `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=7`
    )
      .then((data) => data.json())
      .then((newList) => {
        setList((prevList) => [...prevList, ...newList.content]);
      });
  }, [page]);

  useEffect(() => {
    setList([]);
    setPage(0);
    setReset(false);
  }, [reset]);

  useEffect(() => {
    //intersection observer tem que ter uma callback
    const intersectionObserver = new IntersectionObserver((entries) => {
      //magia - definir se o elemento esta visivel

      if (entries.some((entry) => entry.isIntersecting)) {
        //definir no state a nova pagina a ser mostrada com o novo state

        setPage((currentPageFromState) => currentPageFromState + 1);
      }
    });

    //observar a div
    if (yearPressed === "" && filterType === "")
      intersectionObserver.observe(document.querySelector("#sentinel"));

    //depois de identificar o id da div de vigia fazer o disconnect
    return () => intersectionObserver.disconnect();
  }, [yearPressed, filterType]);

  function openModal(item) {
    setShow(true);
    setListItem(item);
  }

  //css para esconder a scrollbar aplicado ao parent e childrens
  return (
    <div
      style={{
        width: "100%",
        height: "67vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: -20,
          right: -20,
          overflow: "scroll",
        }}
      >
        {list != undefined &&
          list != undefined &&
          list.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              style={{
                flexDirection: "row",
                display: "flex",
                color: "#536B7A",
                fontSize: "16px",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "#9AAEBB",
                opacity: 0.4,
                fontFamily: "Roboto",
              }}
            >
              <div
                style={{
                  width: "12%",
                  textAlign: "center",
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
              >
                {item.rank}
              </div>
              <div style={{ width: "37%", paddingTop: 15, paddingBottom: 15 }}>
                {item.title}
              </div>
              <div style={{ width: "17%", paddingTop: 15, paddingBottom: 15 }}>
                {item.year}
              </div>
              <div style={{ width: "22%", paddingTop: 15, paddingBottom: 15 }}>
                $ {item.revenue}
              </div>
              <div style={{ width: "12%", paddingTop: 15, paddingBottom: 15 }}>
                <img src={eye} />
              </div>
            </div>
          ))}
        <div
          id="sentinel"
          style={{ background: "transparent", height: 20 }}
        ></div>
      </div>

      <MovieDetailModal show={show} setShow={setShow} item={listItem} />
    </div>
  );
};

export default ListToInfinity;
