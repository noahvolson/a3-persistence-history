// client-side js, loaded by index.html
// run by the browser each time the page is loaded

function main() {
  console.log("HELLO WORLD");
  document.getElementById("submitButton").onclick = submit;

  fetch("/myteam")
      .then(response => response.json())
      .then(json => {
        updateDocumentTeam(json);
      });

  updateTheme();
}

const submit = function (e) {

  e.preventDefault();

  let myTeam = []
  for (let i = 1; i < 7; i++) {
    myTeam.push(document.getElementById("inputMember" + i).value);
  }

  fetch("/add", {
    method: "POST",
    body: JSON.stringify(myTeam),
    headers: {
      "Content-Type": "application/json"
    }
  })
      .then(response => response.json())
      .then(json => {
        updateDocumentTeam(json);
      });

  console.log("TEAM SUBMITTED");
}

function updateDocumentTeam( json ) {

  console.log(json.favoriteType);

  let username = json.login;
  let memberArr = json.team;
  let idArr = json.teamIds;

  document.getElementById("playerLine").innerText = "Hello " + username + "!";

  for (let i = 1; i < memberArr.length + 1; i++) {
    document.getElementById("displayMemberName" + i).innerText = memberArr[i - 1];
    if (idArr[i - 1] === null) {
      document.getElementById("displayMemberImg" + i).src = "/assets/0.png";
    }
    else {
      document.getElementById("displayMemberImg" + i).src = "/assets/" + idArr[i - 1].toString() + ".png";
    }
  }
}

function updateTheme() {
  let radios = document.getElementsByName("theme");

  for (let i = 0, length = radios.length; i < length; i++) {

    if (radios[i].checked) {

      switch(i) {
        case 0:
          document.getElementsByTagName("body")[0].style.backgroundColor = "#DEF3FD";
          document.querySelector(".nes-container.with-title > .title").style.backgroundColor = "#DEF3FD";
          break;
        case 1:
          document.getElementsByTagName("body")[0].style.backgroundColor = "#DEFDE0";
          document.querySelector(".nes-container.with-title > .title").style.backgroundColor = "#DEFDE0";
          break;
        case 2:
          document.getElementsByTagName("body")[0].style.backgroundColor = "#FDDFDF";
          document.querySelector(".nes-container.with-title > .title").style.backgroundColor = "#FDDFDF";
          break;
        case 3:
          document.getElementsByTagName("body")[0].style.backgroundColor = "#FCF7DE";
          document.querySelector(".nes-container.with-title > .title").style.backgroundColor = "#FCF7DE";
          break;
        default:
          console.log("How did you even get here???")
      }

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}



