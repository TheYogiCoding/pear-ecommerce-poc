const imagePreviewElement = document.querySelector("#image-upload-preview img");
const imagePickerElement = document.querySelector(
  "#image-upload-preview input"
);

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
}

imagePickerElement.addEventListener("change", updateImagePreview);
