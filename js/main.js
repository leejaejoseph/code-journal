var $userUrl = document.querySelector('[name="imageUrl"]');
$userUrl.addEventListener('input', changeImage);
var $image = document.querySelector('img');

function changeImage(event) {
  $image.src = $userUrl.value;
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
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}
