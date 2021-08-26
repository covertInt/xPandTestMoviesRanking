export function getList(size) {
  return fetch(
    "http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=0&size=" +
      size
  ).then((data) => data.json());
}

export function getListPage(page, size) {
  return fetch(
    "http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=" +
      page +
      "&size=13"
  ).then((data) => data.json());
}
