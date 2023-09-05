let formCount = 0;
let data = [];

function addForm() {
    formCount++;
    let formContainer = document.querySelector(".form-container");
    let newForm = document.createElement("div");
    newForm.setAttribute("data-form-index", formCount);
    newForm.innerHTML =
      `<hr><h2>Form ${formCount}</h2><hr>` +
      `<label for="${formCount}name">Name:</label><br>` +
      `<input type="text" id="${formCount}name" name="${formCount}name"><br>` +
      `<label for="${formCount}mobile">Mobile:</label><br>` +
      `<input type="text" id="${formCount}mobile" name="${formCount}mobile"><br>` +
      `<label for="${formCount}email">Email:</label><br>` +
      `<input type="text" id="${formCount}email" name="${formCount}email"><br>` +
      `<label for="${formCount}chief">Chief:</label><br>` +
      `<input type="text" id="${formCount}chief" name="${formCount}chief"><br>` +
      `<label for="${formCount}executive">Executive:</label><br>` +
      `<input type="text" id="${formCount}executive" name="${formCount}executive"><br> ` +
      `<button onclick="deleteForm(${formCount})" class="preview button">Preview</button>
      </div>`;
    formContainer.appendChild(newForm);
}
