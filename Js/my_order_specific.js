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

// Get car_id from query string
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order_id');

window.addEventListener('DOMContentLoaded', async () => {
  errorMessage.style.display = 'block';
  try {
    loader.style.display = 'block';
    const response = await fetch(`https://automobile-mart.herokuapp.com/api/v1/order/myOrder/${orderId}`, {
      credentials: 'include',
      method: 'GET',
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      const car = responseBody.data;
      document.querySelector('.ad-img').src = car.image_url || 'Images/toyota_camry.jpg';
      document.querySelector('#itemPrice').textContent = `Price: N ${car.price}`;
      document.querySelector('#manufacturer').textContent = car.manufacturer;
      document.querySelector('#model').textContent = car.model;
      document.querySelector('#body_type').textContent = car.body_type;
      document.querySelector('#state').textContent = car.state;
      document.querySelector('#status').textContent = car.order_status;
      document.querySelector('#amountOffered').textContent = car.amount_offered;
      document.querySelector('#m-price').textContent = `PRICE: N ${car.price}`;
      document.querySelector('#m-initial-offer').textContent = `INITIAL OFFER: ${car.amount_offered}`;
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

const updateOffer = async () => {
  try {
    loader.style.display = 'block';
    const body = { price: Number(document.querySelector('#offeredPrice').value) };
    const response = await fetch(`https://automobile-mart.herokuapp.com/api/v1/order/${orderId}/price`, {
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
      errorMessage.textContent = 'Purchase order updated successfully. Please refresh';
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
  window.location.assign('index.html');
};
