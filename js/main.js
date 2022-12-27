var $userUrl = document.querySelector('[name="image-url"]');
$userUrl.addEventListener('input', changeImage);
var $image = document.querySelector('img');

function changeImage(event) {
  $image.src = $userUrl.value;
}
