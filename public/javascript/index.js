const charactersAPI = new APIHandler("http://localhost:8000");

async function getAll(event) {
  const response = await charactersAPI.getFullList();
  document.querySelector(".characters-container").innerHTML = "";
  response.forEach((data) => {
    document.querySelector(
      ".characters-container"
    ).innerHTML += `<div class="character-info">
        <div class="name">Character Name: ${data.name}</div>
        <div class="occupation">Character Occupation: ${data.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${data.cartoon ? "Yes" : "No"}</div>
        <div class="weapon">Character Weapon: ${data.weapon}</div>
      </div>`;
  });
}

window.addEventListener("load", () => {
  document.getElementById("fetch-all").addEventListener("click", getAll);

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      const id = document.querySelector('input[name="character-id"]').value;
      const response = await charactersAPI.getOneRegister(id);
      document.querySelector(".characters-container").innerHTML = `
      <div class="character-info">
        <div class="name">Character Name: ${response.name}</div>
        <div class="occupation">Character Occupation: ${
          response.occupation
        }</div>
        <div class="cartoon">Is a Cartoon? ${
          response.cartoon ? "Yes" : "No"
        }</div>
        <div class="weapon">Character Weapon: ${response.weapon}</div>
      </div>
      `;
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      // event.preventDefault();
      const id = document.querySelector(
        'input[name="character-id-delete"]'
      ).value;
      const response = await charactersAPI.deleteOneRegister(id);
      if (response.status === 200) {
        document.querySelector("#delete-one").style.background = "green";
      } else {
        document.querySelector("#delete-one").style.background = "red";
      }
      getAll();
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const id = event.target[0].value;
      const data = {
        name: event.target[1].value,
        occupation: event.target[2].value,
        weapon: event.target[3].value,
        cartoon: event.target[4].checked,
      };
      const response = await charactersAPI.updateOneRegister(data, id);
      if (response.status === 200) {
        document.querySelector(
          "#edit-character-form #send-data"
        ).style.background = "green";
      } else {
        document.querySelector(
          "#edit-character-form #send-data"
        ).style.background = "red";
      }
      getAll();
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log(event);
      const data = {
        name: event.target[0].value,
        occupation: event.target[1].value,
        weapon: event.target[2].value,
        cartoon: event.target[3].checked,
      };
      const response = await charactersAPI.createOneRegister(data);
      if (response.status === 201) {
        document.querySelector(
          "#new-character-form #send-data"
        ).style.background = "green";
      } else {
        document.querySelector(
          "#new-character-form #send-data"
        ).style.background = "red";
      }
      getAll();
    });
});
