
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("userEmail").innerText = user.email;
    const userDocRef = firebase.firestore().collection("users").doc(user.uid);

    userDocRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("status").style.display = "none";
        document.getElementById("scorePanel").style.display = "block";

        document.getElementById("levelPlayed").innerText = data.level || "N/A";
        document.getElementById("lastScore").innerText = data.score || "N/A";

        const missedList = document.getElementById("missedWordsList");
        missedList.innerHTML = "";
        if (data.missedWords && data.missedWords.length > 0) {
          data.missedWords.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            missedList.appendChild(li);
          });
        } else {
          const li = document.createElement("li");
          li.textContent = "None! Great job!";
          missedList.appendChild(li);
        }
      } else {
        document.getElementById("status").innerText = "No quiz history found yet.";
      }
    });
  } else {
    window.location.href = "login.html";
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
