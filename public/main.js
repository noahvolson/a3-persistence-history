// client-side js, loaded by index.html
// run by the browser each time the page is loaded

function main() {
  console.log("HELLO WORLD");
  document.getElementById("submitButton").onclick = submit;

  fetch("/myteam")
      .then(response => response.json())
      .then(json => {
        updateDocumentTeam(json.team);
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
      .then(arr => {
        updateDocumentTeam(arr)
      });

  console.log("TEAM SUBMITTED");
}

function updateDocumentTeam( memberArr ) {
  for (let i = 1; i < 7; i++) {
    document.getElementById("displayMember" + i).innerText = memberArr[i - 1]
  }
}



