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
}

function renderEntry(entry) {
  var $entriesImg = document.getElementById('imgEntry');
  var $entriesH2 = document.getElementById('h2Entry');
  var $entriesP = document.getElementById('pEntry');
  $entriesImg.src = entry.imageUrl;
  $entriesH2.textContent = entry.title;
  $entriesP.textContent = entry.notes;
}

renderEntry({ imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAGEAPgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABQMEBgcCAf/EAC0QAAIBAwIEBQQCAwAAAAAAAAECAAMEESExBRJBUQYTMmGhInGBkbHBFCNC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMCBQYEAf/EACQRAAICAQMEAgMAAAAAAAAAAAABAgMRBSExBBJBUWGRIiNC/9oADAMBAAIRAxEAPwDuMIQgAQhCAFHi3FrHg9utfiFcUkZuVc6kmXVIZQynIIyCJg+L2q+KvGn+DVLGy4euHAOMnALfslR+DN1SppRpJSpqFRFCqo6AbRcJuUn6QHuEIRgBCEIAeajrTQu7BVAySekVnjlFiRRps47k4zE3jDiLG5SyR8U0w1THU9B+v5lThtVWYAGUPX6nZXZ2VeOWMhFPku+F7VeGXN5XuanmVrp+dnVepJJ+TNYpDDIOQYp4eqmm6sBr3lywf6WQ/wDO06Oh6mTUYz/rP2E484LcIQlsLCfCcbz7FviC/Fhw92z/ALKn0IPeQsmq4OT8AYDitZrjiNeqT63J+3b+pYsiVYZbHuJQLBqmSMZMZ2iqSATMVdLO7GQRo7Crldxnv3l+zfluBnTm0ii1+jCltOhjLJGGGvXMd01ri1L0x7WUOISOjUFSmGH5kk2EZKUVJcM5HsEwniy+Ne85FP0JoJsuJVTRsqrr6sYH5nOb7meuTkYA/OZU6tdiKr9gVFU84G2PbrHFlkY10G8StzY2zpLtncHGM+w5pnrE2hsXhmntmUqM7y8hyg5duoMRW1cDHMd9wI0t62QMGeVWJbMetxjaVfKcKfSfiMoiDa6axxbOXoqTviaDSeo7k6n44E2xxuQ8VXnsnH2mCvKB8xiB1zvOjVFDoyMMgjBmF4hSe3vKtKp6lPXYjoZDWYP8Zi48ig2+c76955FMhwpGFI0HvGHlDO2ciTi3Gcyh7xiiV6bsEwd8RjZVi2+c9pAtALjTOveWadIJrj7xTWRkUMKOBtpHlmCLdcxPY0jUdQNc65j5RygAbCaLRqWs2PjghdLwfYt41wpOJUgVIS4T0Pj4PtGUJd2Vxsi4yWzEHOqheyrmhdo1OqOjdfcdxLNGujD1D9zaXtlbX1LyruglVOgYbfbtE7+D+Es2VW5pjstw2Pkygt0SXd+uW3yMVjQvpvTJ0IyZdtbVq5AQZA3PaXrbw7wu39NtznvVdn+CcRnTppSQJTRUUbKowBJU6K082S2+CTt24Ira3WgmBqepk8IS+hCMIqMVsJbyEIQkgCEIQAIQhAAhCEAP/9k=', title: 'pears', notes: 'it\'s a fruit' });
