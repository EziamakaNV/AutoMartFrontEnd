/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};

const modal = document.getElementById('myModal');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const errorMessage = document.querySelector('.error-message-div');

const loader = document.querySelector('#loaderModal');

// Get carId from query string
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('car_id');

window.addEventListener('DOMContentLoaded', async () => {
  errorMessage.style.display = 'block';
  try {
    loader.style.display = 'block';
    const response = await fetch(`https://automobile-mart.herokuapp.com/api/v2/car/${carId}`, {
      credentials: 'include',
      method: 'GET',
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      const car = responseBody.data;
      document.querySelector('.ad-img').src = car.image_url || '/Images/toyota_camry.jpg';
      document.querySelector('#itemPrice').textContent = `Price: N ${car.price}`;
      document.querySelector('#manufacturer').textContent = car.manufacturer;
      document.querySelector('#model').textContent = car.model;
      document.querySelector('#bodyType').textContent = car.bodyType;
      document.querySelector('#state').textContent = car.state;
      document.querySelector('#status').textContent = car.status;
      document.querySelector('#itemDescription').textContent = `Up for sale! - ${car.manufacturer} ${car.model}`;
      document.querySelector('#description').textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veniam, ullam laudantium laborum libero ex magnam consequatur deserunt voluptatum, temporibus beatae voluptate assumenda est? Quibusdam dicta blanditiis nihil fugiat unde';
      loader.style.display = 'none';
      errorMessage.style.display = 'none';
    } else {
      errorMessage.textContent = responseBody.error;
      loader.style.display = 'none';
    }
  } catch (error) {
    errorMessage.textContent = error;
  }
});

const markAsSold = async () => {
  try {
    loader.style.display = 'block';
    const body = { status: 'sold' };
    const response = await fetch(`https://automobile-mart.herokuapp.com/api/v2/car/${carId}/status`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      loader.style.display = 'none';
      errorMessage.textContent = 'Successfully marked as "sold". Please refresh page.';
      errorMessage.style.backgroundColor = 'white';
      errorMessage.style.color = 'green';
      errorMessage.style.display = 'block';
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

const updatePrice = async () => {
  try {
    loader.style.display = 'block';
    const body = { price: document.querySelector('#price').value };
    const response = await fetch(`https://automobile-mart.herokuapp.com/api/v2/car/${carId}/price`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      loader.style.display = 'none';
      modal.style.display = 'none';
      errorMessage.textContent = 'The price was updated successfully. Please refresh page';
      errorMessage.style.backgroundColor = 'white';
      errorMessage.style.color = 'green';
      errorMessage.style.display = 'block';
    } else {
      loader.style.display = 'none';
      modal.style.display = 'none';
      errorMessage.textContent = responseBody.error;
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    loader.style.display = 'none';
    modal.style.display = 'none';
    errorMessage.textContent = error;
    errorMessage.style.display = 'block';
  }
};

const logout = async () => {
  await fetch('https://automobile-mart.herokuapp.com/logout', {
    credentials: 'include',
    method: 'GET',
  });
};
