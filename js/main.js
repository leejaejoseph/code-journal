var $userUrl = document.querySelector('[name="imageUrl"]');
$userUrl.addEventListener('input', changeImage);
var $newImage = document.getElementById('newEntryImg');

function changeImage(event) {
  $newImage.src = $userUrl.value;
}

var $form = document.querySelector('form');
$form.addEventListener('submit', submission);

function submission(event) {
  event.preventDefault();
  var formObject = {
    title: $form.elements.title.value,
    imageUrl: $form.elements.imageUrl.value,
    notes: $form.elements.notes.value
  };
  formObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formObject);
  $newImage.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  getEntry(data.entries[0]);
  toggleNoEntries();
  viewEntries();
}

function renderEntry(entry) {
  var $entriesImg = document.getElementById('img' + entry.entryId);
  var $entriesH2 = document.getElementById('h2' + entry.entryId);
  var $entriesP = document.getElementById('p' + entry.entryId);
  $entriesImg.src = entry.imageUrl;
  $entriesH2.textContent = entry.title;
  $entriesP.textContent = entry.notes;
}

document.addEventListener('DOMContentLoaded', getEntry('contentLoad'));

function getEntry(entry) {
  var length = 0;
  if (entry === 'contentLoad') {
    length = data.entries.length;
    toggleNoEntries();
  } else {
    length = 1;
  }
  for (var i = 0; i < length; i++) {
    var $ul = document.querySelector('ul');
    var $li = document.createElement('li');
    $li.setAttribute('class', 'row');
    $ul.appendChild($li);

    var $divImg = document.createElement('div');
    $divImg.setAttribute('class', 'column-half');
    $li.appendChild($divImg);

    var $img = document.createElement('img');
    var imgEntry = 'img' + data.entries[i].entryId;
    $img.setAttribute('id', imgEntry);
    $divImg.appendChild($img);

    var $divText = document.createElement('div');
    $divText.setAttribute('class', 'column-half');
    $li.appendChild($divText);

    var $h2 = document.createElement('h2');
    var h2Entry = 'h2' + data.entries[i].entryId;
    $h2.setAttribute('id', h2Entry);
    $divText.appendChild($h2);

    var $p = document.createElement('p');
    var pEntry = 'p' + data.entries[i].entryId;
    $p.setAttribute('id', pEntry);
    $divText.appendChild($p);

    renderEntry(data.entries[i]);
  }
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
