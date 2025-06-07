function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      document.getElementById('message').innerText = 'Welcome back, ' + email + '!';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    })
    .catch(err => {
      document.getElementById('message').innerText = err.message;
    });
}
