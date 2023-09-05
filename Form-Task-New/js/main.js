let formCount = 0;
let data = [];
function addHobbyInput(formIndex) {
  let hobbiesContainer = document.getElementById(`${formIndex}hobbiesContainer`);
  let newHobbyInput = document.createElement("input");
  newHobbyInput.className = "hobby-input"; 
  newHobbyInput.id = "hobby-input"; 
  newHobbyInput.name = `${formIndex}hobbies`;
  hobbiesContainer.appendChild(newHobbyInput);
  hobbiesContainer.appendChild(document.createElement("br"));
}


function deleteHobbyInput(formIndex) {
  let hobbiesContainer = document.getElementById(`${formIndex}hobbiesContainer`);
  let hobbyInputs = hobbiesContainer.querySelectorAll(".hobby-input"); 
  if (hobbyInputs.length > 0) {
    hobbiesContainer.removeChild(hobbyInputs[hobbyInputs.length - 1]);
    if (hobbyInputs.length > 1) {
      hobbiesContainer.removeChild(hobbiesContainer.lastChild); 
    }
  }
}


function addForm() {
  formCount++;
  let formContainer = document.querySelector(".form-container");
  let newForm = document.createElement("div");
  newForm.setAttribute("data-form-index", formCount);
  newForm.innerHTML =
    `<hr><h2>Form ${formCount}</h2><hr>` +
    `<label for="${formCount}name">Name:</label><br>` +
    `<input type="text" id="${formCount}name" name="${formCount}name"><br>` +
    `<label for="${formCount}address">Address:</label><br>` +
    `<input type="text" id="${formCount}address" name="${formCount}address"><br>` +
    `<label for="${formCount}dob">Date of Birth:</label><br>` +
    `<input type="date" id="${formCount}dob" name="${formCount}dob" onchange="calculateAge(${formCount})"><br>` +

    `<label for="${formCount}age">Age:</label><br>` +
    `<input type="text" id="${formCount}age" name="${formCount}age" ><br>` +
    `<label for="${formCount}gender">Gender:</label><br>` +
    `<select id="${formCount}gender" name="${formCount}gender">` +
    `<option value="">Select Gender</option>` +
    `<option value="MALE">Male</option>` +
    `<option value="FEMALE">Female</option>` +
    `<option value="OTHER">Other</option>` +
    `</select><br>` +
    `<label for="${formCount}hobbies">Hobbies:</label><br>` +
    `<div id="${formCount}hobbiesContainer">` +
    `<button onclick="addHobbyInput(${formCount})" id="hobby-button">+</button>` +
    `<button onclick="deleteHobbyInput(${formCount})" id="hobby-button">-</button>`+
    `<input type="text" class="hobby-input" name="${formCount}hobbies">` +
    `<button onclick="deleteForm(${formCount})" class="delete-form-button">Delete Form</button>
    </div>`;
  formContainer.appendChild(newForm);

  if (formCount > 1) {
    let deleteFormButtons = document.querySelectorAll(".delete-form-button");
    deleteFormButtons.forEach(button => {
      button.style.display = "block";
    });
  } else {
    let deleteFormButtons = document.querySelectorAll(".delete-form-button");
    deleteFormButtons.forEach(button => {
      button.style.display = "none";
    });
  }
  
  let dobInput = document.getElementById(`${formCount}dob`);
  dobInput.addEventListener("change", () => calculateAge(formCount));
    let removeFormButton = document.getElementById("deleteForm");
    removeFormButton.style.display ="block";

}

function deleteForm(formIndex) {
  let formToDelete = document.querySelector(`[data-form-index="${formIndex}"]`);
  if (formToDelete) {
    formToDelete.remove();
    formCount--;

    if (formCount === 1) {
      let deleteFormButtons = document.querySelectorAll(".delete-form-button");
      deleteFormButtons.forEach(button => {
        button.style.display = "none";
      });
    }
  } else {
    alert("Form not found!");
  }
}

function preview() {
    let data = [];
    for (let i = 1; i <= formCount; i++) {
      let name = document.getElementById(`${i}name`).value;
      let address = document.getElementById(`${i}address`).value;
      let dob = document.getElementById(`${i}dob`).value;

      let age = calculateAge(i);
      let gender = document.getElementById(`${i}gender`).value;
      let hobbiesContainer = document.getElementById(`${i}hobbiesContainer`);
      let hobbiesInputs = hobbiesContainer.getElementsByClassName("hobby-input");
      let hobbies = Array.from(hobbiesInputs).map(input => input.value).join(", ");
      data.push({ name, address, dob, age, gender, hobbies });
    }
    let table = generateTable(data);

    let previewScreen= window.open("", "Preview", "width=600,height=400");
    previewScreen.document.write(table);
  
    let submitButton = previewScreen.document.createElement("button");
    submitButton.innerText = "CONFIRM";
    submitButton.addEventListener("click", () => {
        previewScreen.close();
      alert("Data submitted!");
      resetForm();
      addDataToTable(data);
    });
    previewScreen.document.body.appendChild(submitButton);
  }
  

  function addDataToTable(data) {
    let tableBody = document.getElementById("detailsTable").getElementsByTagName("tbody")[0];
  
    for (let i = 0; i < data.length; i++) {
      let newRow = tableBody.insertRow();
      newRow.id = `row-${Date.now()}`;
      let nameCell = newRow.insertCell(0);
      let addressCell = newRow.insertCell(1);
      let dobCell = newRow.insertCell(2);
      let ageCell = newRow.insertCell(3);
      let genderCell = newRow.insertCell(4);
      let hobbiesCell = newRow.insertCell(5);
      let del = newRow.insertCell(6);
  
      nameCell.innerHTML = data[i].name;
      addressCell.innerHTML = data[i].address;
      dobCell.innerHTML = data[i].dob;
      ageCell.innerHTML = data[i].age;
      genderCell.innerHTML = data[i].gender;
      hobbiesCell.innerHTML = data[i].hobbies;

      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "taBleDeleteButton";
      deleteButton.onclick = () => deleteTableRow(newRow.id);
      del.appendChild(deleteButton);
    }
  }
  
  function deleteTableRow(rowId) {
    let rowToDelete = document.getElementById(rowId);
    if (rowToDelete) {
      rowToDelete.remove();
    }
  }

  function resetForm() {
    for (let i = 1; i <= formCount; i++) {
        document.getElementById(`${i}name`).value = "";
        document.getElementById(`${i}address`).value = "";
        document.getElementById(`${i}dob`).value = "";
        document.getElementById(`${i}age`).value = "";
        document.getElementById(`${i}gender`).value = "";
        let hobbiesContainer = document.getElementById(`${i}hobbiesContainer`);
        hobbiesContainer.innerHTML = ""; 

        let defaultHobbyInput = document.createElement("input");
        defaultHobbyInput.className = "hobby-input";
        defaultHobbyInput.name = `${i}hobbies`;
        hobbiesContainer.appendChild(defaultHobbyInput);
        hobbiesContainer.appendChild(document.createElement("br"));
   }
}

function calculateAge(i) {
  let dob = document.getElementById(`${i}dob`).value;
  if (dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    document.getElementById(`${i}age`).value = age;
    return age;
  } else {
    document.getElementById(`${i}age`).value = "";
    return "";
  }
}

function generateTable(data) {
  let table =
    "<table><tr><th>Name</th><th>Address</th><th>Date of Birth</th><th>Age</th><th>Gender</th><th>Hobbies</th></tr>";
  for (let i = 0; i < data.length; i++) {
    table += `<tr><td>${data[i].name}</td><td>${data[i].address}</td><td>${data[i].dob}</td><td>${data[i].age}</td><td>${data[i].gender}</td><td>${data[i].hobbies}</td></tr>`;
  }
  table += "</table>";
  return table;
}



  
  
  
  
  