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
