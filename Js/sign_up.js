/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};

const submitForm = async () => {
  const modal = document.querySelector('#myModal');
  modal.style.display = 'block';
  const first_name = document.querySelector('#first_name').value;
  const last_name = document.querySelector('#last_name').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const password = document.querySelector('#password').value;
  const errorMessageContainer = document.querySelector('.error-message-div');
  try {
    /*
      By default, fetch won't send or receive any cookies from the server,
      resulting in unauthenticated requests if the site relies on maintaining
      a user session (to send cookies, the credentials init option must be set).
      */
    const body = {
      first_name,
      last_name,
      email,
      address,
      password,
    };
    const response = await fetch('https://automobile-mart.herokuapp.com/api/v1/auth/signup', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();

    if (response.status === 200) {
      window.location.assign('profile_page.html');
    } else {
      modal.style.display = 'none';
      errorMessageContainer.style.display = 'block';
      errorMessageContainer.textContent = `${responseBody.error}`;
    }
  } catch (error) {
    errorMessageContainer.style.display = 'block';
    errorMessageContainer.textContent = `${error}`;
    modal.style.display = 'none';
  }
};
