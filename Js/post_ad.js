/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById("myDropDown").classList.toggle("show");
};

const errorMessage = document.querySelector('.error-message-div');

const form = document.querySelector('#form');

const loader = document.querySelector('#loaderModal');

const createAd = async () => {
  loader.style.display = 'block';
  // Create new form data (HTML form element) object
  const formData = new FormData(form);
  try {
    const response = await fetch('https://automobile-mart.herokuapp.com/api/v1/car', {
      credentials: 'include',
      method: 'POST',
      body: formData,
    });
    const responseBody = await response.json();
    if (response.status === 201) {
      loader.style.display = 'none';
      form.style.display = 'none';
      errorMessage.textContent = 'Ad Successfully created';
      errorMessage.style.color = 'green';
      errorMessage.style.display = 'block';
      const errTimer = setTimeout(() => { window.location.assign('profile_page.html'); }, 4000);
      clearTimeout(errTimer);
    } else {
      loader.style.display = 'none';
      errorMessage.textContent = responseBody.error;
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    loader.style.display = 'none';
    errorMessage.textContent = error;
    errorMessage.style.display = 'block';
  }
};

const logout = async () => {
  await fetch('https://automobile-mart.herokuapp.com/logout', {
    credentials: 'include',
    method: 'GET',
  });
  window.location.assign('index.html');
};