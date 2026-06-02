const token = localStorage.getItem('token');

if (!token) {

  alert('Você precisa fazer login');

  window.location.href = 'login.html';

}