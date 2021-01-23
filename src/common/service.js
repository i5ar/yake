const url = "https://api.qmk.fm/v1/keyboards";

function fetchKeyboards(api) {
  return fetch(api ? url : "/keyboards.json")
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}

function fetchKeyboard(api, keyboard) {
  const path = api ? `${url}/${keyboard}` : `/keyboards/${keyboard}/info.json`;
  return fetch(path)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}

export {
  fetchKeyboards,
  fetchKeyboard
};
