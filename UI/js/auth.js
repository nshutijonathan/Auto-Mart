function toggleSignup() {
  document.getElementById('login-toggle').style.backgroundColor = '#fff';
  document.getElementById('login-toggle').style.color = '#222';
  document.getElementById('signup-toggle').style.backgroundColor = '#57b846';
  document.getElementById('signup-toggle').style.color = '#fff';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function toggleLogin() {
  document.getElementById('login-toggle').style.backgroundColor = '#57B846';
  document.getElementById('login-toggle').style.color = '#fff';
  document.getElementById('signup-toggle').style.backgroundColor = '#fff';
  document.getElementById('signup-toggle').style.color = '#222';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}
function openNav() {
  document.getElementById('mySidebar').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

function closeNav() {
  document.getElementById('mySidebar').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
}
function landing() {
  const x = document.getElementById('myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}
function PurchaseConfirm() {
  var confirm = confirm('Are you sure to order the car?');
  if (confirm == true) {
    alert('Purchasing order Successfully sent!!');
    return true;
  }

  alert('Purchasing order not Successfully sent!!');
  return false;
}
function changecontent() {
  rn = window.prompt('Enter Row number(0,1,2,3,4,5,6)', '0');
  cn = window.prompt('Enter Column number(0,1,2,3,4,5,6)', '0');
  content = window.prompt('Update the price');
  result = document.getElementById('myTable').rows[parseInt(rn, 10)].cells;
  result[parseInt(cn, 10)].innerHTML = content;
}
