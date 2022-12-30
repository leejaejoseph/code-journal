var $userUrl = document.querySelector('[name="imageUrl"]');
$userUrl.addEventListener('input', changeImage);
var $newImage = document.getElementById('newEntryImg');

function changeImage(event) {
  $newImage.src = $userUrl.value;
}

var $form = document.querySelector('form');
$form.addEventListener('submit', submission);

var $ul = document.querySelector('ul');
var currentlyEditing = null;

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
    $newImage.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    $ul.prepend(renderEntry(data.entries[0]));
    toggleNoEntries();
  } else {
    formObject.entryId = data.editing.entryId;
    data.entries[currentlyEditing].title = $form.elements.title.value;
    data.entries[currentlyEditing].imageUrl = $form.elements.imageUrl.value;
    data.entries[currentlyEditing].notes = $form.elements.notes.value;
    $ul.innerHTML = '';
    getEntry();
    document.querySelector('h1').textContent = 'New Entry';
    $form.elements.title.value = '';
    $form.elements.imageUrl.value = '';
    $form.elements.notes.value = '';
    $newImage.src = 'images/placeholder-image-square.jpg';
    data.editing = null;
    currentlyEditing = null;
  }
  viewEntries();
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

document.addEventListener('DOMContentLoaded', getEntry);

function getEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  toggleNoEntries();
  viewSwap(data.view);
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    document.querySelector('.entries').className = 'entries';
  } else if (data.entries.length > 0) {
    document.querySelector('.entries').className = 'entries hidden';
  }
}

function viewSwap(event) {
  var $view = document.querySelectorAll('.view');
  data.view = event;
  for (var i = 0; i < $view.length; i++) {
    var $dataView = $view[i].getAttribute('data-view');
    if ($dataView === event) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

var $newButton = document.querySelector('.new-button');
var $entriesAnchor = document.querySelector('.entriesAnchor');
$newButton.addEventListener('click', viewEntryForm);
$entriesAnchor.addEventListener('click', viewEntries);

function viewEntryForm() {
  viewSwap('entry-form');
}

function viewEntries() {
  viewSwap('entries');
}

function iconFunction(entry) {
  var ancestorLiEntryId = entry.target.closest('li').getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(ancestorLiEntryId)) {
      data.editing = data.entries[i];
      currentlyEditing = i;
    }
  }
  document.querySelector('#title').value = data.editing.title;
  document.querySelector('#imageUrl').value = data.editing.imageUrl;
  changeImage();
  document.querySelector('#notes').value = data.editing.notes;
  document.querySelector('h1').textContent = 'Edit Entry';
  viewEntryForm();
}
