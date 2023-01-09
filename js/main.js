document.addEventListener('DOMContentLoaded', loaded);
function loaded() {
  getEntry();
  if (data.view === 'entry-form') {
    if (data.editing === null) {
      newForm();
    } else {
      editingForm();
    }
    viewEntryForm();
  } else {
    viewEntries();
  }
}

function getEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
}

function newForm() {
  document.querySelector('h1').textContent = 'New Entry';
  $form.reset();
  $newImage.src = 'images/placeholder-image-square.jpg';
  document.querySelector('.delete-entry').classList.add('hidden');
}

var $userUrl = document.querySelector('[name="imageUrl"]');
$userUrl.addEventListener('input', changeImage);
var $newImage = document.getElementById('newEntryImg');

function changeImage(event) {
  $newImage.src = $userUrl.value;
}

function editingForm() {
  document.querySelector('h1').textContent = 'Edit Entry';
  $form.elements.title.value = data.editing.title;
  $form.elements.imageUrl.value = data.editing.imageUrl;
  $form.elements.notes.value = data.editing.notes;
  $newImage.src = data.editing.imageUrl;
  document.querySelector('.delete-entry').classList.remove('hidden');
}

var $newButton = document.querySelector('.new-button');
var $entriesAnchor = document.querySelector('.entriesAnchor');
$newButton.addEventListener('click', newButton);
$entriesAnchor.addEventListener('click', viewEntries);

function newButton() {
  newForm();
  viewEntryForm();
}

function viewEntryForm() {
  data.view = 'entry-form';
  viewSwap('entry-form');
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    document.querySelector('.entries').className = 'entries';
  } else if (data.entries.length > 0) {
    document.querySelector('.entries').classList.add('hidden');
  }
}

function viewSwap(event) {
  var $view = document.querySelectorAll('.view');
  for (var i = 0; i < $view.length; i++) {
    var $dataView = $view[i].getAttribute('data-view');
    if ($dataView === event) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function viewEntries() {
  data.view = 'entries';
  data.editing = null;
  toggleNoEntries();
  viewSwap('entries');
}

var $form = document.querySelector('form');
$form.addEventListener('submit', submission);
var $ul = document.querySelector('ul');

function submission(event) {
  event.preventDefault();
  var formObject = {
    title: $form.elements.title.value,
    imageUrl: $form.elements.imageUrl.value,
    notes: $form.elements.notes.value
  };
  if (data.editing === null) {
    formObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formObject);
    $ul.prepend(renderEntry(data.entries[0]));
  } else {
    $ul.innerHTML = '';
    formObject.entryId = data.editing.entryId;
    editingForm();
    data.entries[editingIndex] = formObject;
    getEntry();
  }
  toggleNoEntries();
  viewEntries();
  data.editing = null;
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);

  var $divImg = document.createElement('div');
  $divImg.setAttribute('class', 'column-half');
  $li.appendChild($divImg);

  var $img = document.createElement('img');
  $img.src = entry.imageUrl;
  var imgEntry = 'img' + entry.entryId;
  $img.setAttribute('id', imgEntry);
  $divImg.appendChild($img);

  var $divText = document.createElement('div');
  $divText.setAttribute('class', 'column-half');
  $li.appendChild($divText);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row jc-space-between ai-center');
  $divText.appendChild($divRow);

  var $divAuto1 = document.createElement('div');
  $divAuto1.setAttribute('class', 'column-auto');
  $divRow.appendChild($divAuto1);

  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  var h2Entry = 'h2' + entry.entryId;
  $h2.setAttribute('id', h2Entry);
  $divAuto1.appendChild($h2);

  var $divAuto2 = document.createElement('div');
  $divAuto2.setAttribute('class', 'column-auto');
  $divRow.appendChild($divAuto2);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa fa-pencil');
  $icon.setAttribute('data-entry-id', entry.entryId);
  $icon.addEventListener('click', iconFunction);
  $divAuto2.appendChild($icon);

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  var pEntry = 'p' + entry.entryId;
  $p.setAttribute('id', pEntry);
  $divText.appendChild($p);
  return $li;
}

var editingIndex = null;
function iconFunction(entry) {
  var ancestorLiEntryId = entry.target.closest('li').getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(ancestorLiEntryId)) {
      data.editing = data.entries[i];
      editingIndex = i;
    }
  }
  editingForm();
  viewEntryForm();
}

$form.querySelector('#anchorDelete').addEventListener('click', handleModal);

function handleModal(event) {
  $form.querySelector('.overlay').classList.remove('hidden');
}

$form.querySelector('#cancelButton').addEventListener('click', handleCancel);

function handleCancel(event) {
  event.preventDefault();
  $form.querySelector('.overlay').classList.add('hidden');
}

$form.querySelector('#deleteButton').addEventListener('click', handleDelete);

function handleDelete(event) {
  event.preventDefault();
  data.entries.splice(editingIndex, 1);
  $ul.innerHTML = '';
  getEntry();
  viewEntries();
  data.editing = null;
  $form.querySelector('.overlay').classList.add('hidden');
}
