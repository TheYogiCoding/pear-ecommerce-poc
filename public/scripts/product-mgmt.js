const deleteProductBtnElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const btnElement = event.target;
  const productID = btnElement.dataset.productid;
  const csrfToken = btnElement.dataset.csrf;

  //Fetch used for calling the delete request for us
  const response = await fetch(
    "/admin/products/" + productID + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  //If the response is not 201 or 200 OK
  if (!response.ok) {
    alert("An Error occured - please try again later!");
    return;
  }

  //Otherwise remove the element from the page
  //Parent of div prod item actions > product item content > product item > li
  //DOM Traversal practise
  btnElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductBtnElement of deleteProductBtnElements) {
  deleteProductBtnElement.addEventListener("click", deleteProduct);
}
