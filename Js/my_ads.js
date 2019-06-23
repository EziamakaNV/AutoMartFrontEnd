/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};

const adContainer = document.querySelector('#pr-ad-cntnr');
const loader = document.querySelector('#loaderModal');
const errorMessage = document.querySelector('.error-message-div');

window.addEventListener('DOMContentLoaded', async () => {
  errorMessage.style.display = 'block';
  try {
    loader.style.display = 'block';
    const response = await fetch('https://automobile-mart.herokuapp.com/api/v2/car/myCar', {
      credentials: 'include',
      method: 'GET',
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      responseBody.data.forEach((car) => {
        adContainer.insertAdjacentHTML('afterbegin', `
              <a href='/my_ad_specific.html?car_id=${car.id}'>
              <div class="pr-ad" id="${car.id}">
                  <figure>
                      <img class='ad-img' src='${car.image_url || 'Images/toyota_camry.jpg'}' alt = 'Car'>
                  </figure>
                  <div class="pr-ad-details">
                      <p class="item-price">N ${car.price}</p>
                      <p class="item-title">${car.manufacturer} ${car.model}</p>
                  </div>
              </div>
              </a>`);
      });
      loader.style.display = 'none';
      errorMessage.style.display = 'none';
    } else {
      loader.style.display = 'none';
    }
  } catch (error) {
    // Reload the page if there's an error
    errorMessage.textContent = error;
  }
});

const logout = async () => {
  await fetch('https://automobile-mart.herokuapp.com/logout', {
    credentials: 'include',
    method: 'GET',
  });
};
