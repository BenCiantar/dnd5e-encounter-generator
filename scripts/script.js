const body = document.getElementById("body");

getApi();


function getApi() {
    fetch("https://www.dnd5eapi.co/api/spells/", {
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("test");
        console.log(data);
    })
}


