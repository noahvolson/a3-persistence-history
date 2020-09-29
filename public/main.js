// client-side js, loaded by index.html
// run by the browser each time the page is loaded

function main() {
  console.log("HELLO WORLD");
  document.getElementById("submitButton").onclick = submit;

  fetch("/myteam")
      .then(response => response.json())
      .then(json => {
        updateDocumentTeam(json.team, json.teamIds);
      });
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
        updateDocumentTeam(json.team, json.teamIds);
      });

  console.log("TEAM SUBMITTED");
}

function updateDocumentTeam( memberArr, idArr ) {
  for (let i = 1; i < memberArr.length + 1; i++) {
    document.getElementById("displayMemberName" + i).innerText = memberArr[i - 1];
    if (idArr[i - 1] === null) {
      document.getElementById("displayMemberImg" + i).src = "/assets/000.png";
    }
    else {
      document.getElementById("displayMemberImg" + i).src = "/assets/" + idArr[i - 1].toString().padStart(3,'0') + ".png";
    }
  }
}



