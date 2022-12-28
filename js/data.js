/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', JSONStorage);

function JSONStorage(event) {
  localStorage.setItem('data-in-JSON', JSON.stringify(data));
}

if (localStorage.getItem('data-in-JSON') !== null) {
  data = JSON.parse(localStorage.getItem('data-in-JSON'));
}
