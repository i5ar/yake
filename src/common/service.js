let basename = window.location.pathname.replace(/^\/([^/]*).*$/, "$1");
basename = basename ? `/${basename}` : "";

function fetchKeyboards(api) {
  return fetch(api ? "https://api.qmk.fm/v1/keyboards" : `${basename}/keyboards.json`)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}

function fetchKeyboard(api, keyboard) {
  const path = api ?
    `https://api.qmk.fm/v1/keyboards/${keyboard}` :
    `${basename}/keyboards/${keyboard}/info.json`;
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
