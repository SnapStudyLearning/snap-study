
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById('message').innerText = 'Welcome back, ' + email + '!';
      window.location.href = 'dashboard.html';
    })
    .catch(err => {
      document.getElementById('message').innerText = err.message;
    });
}
