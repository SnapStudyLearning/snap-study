function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Optional success message
      document.getElementById('message').innerText = 'Welcome back, ' + email + '!';

      // ✅ Redirect to dashboard
      window.location.href = 'dashboard.html';
    })
    .catch(err => {
      document.getElementById('message').innerText = err.message;
    });
}

