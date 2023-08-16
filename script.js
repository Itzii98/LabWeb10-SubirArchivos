const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];
  
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

  const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

  if (allowedExtensions.includes(fileExtension) && selectedFile.size <= maxSize) {
    fileInfo.innerHTML = `
      Nombre del archivo: ${selectedFile.name}<br>
      Tipo MIME: ${selectedFile.type}<br>
      Tamaño: ${selectedFile.size} bytes
    `;

    if (selectedFile.type.startsWith('image/')) {
      preview.style.display = 'block';
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      preview.style.display = 'none';
    }
  } else {
    fileInfo.innerHTML = 'Archivo no válido. Por favor, selecciona un archivo .jpg, .png o .gif de hasta 5 MB.';
    preview.style.display = 'none';
    fileInput.value = ''; // Clear the input
  }
});