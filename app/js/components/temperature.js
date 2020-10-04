const STP = 273;

let
  temperatureSlider = document.querySelector('.temperature__inputs__slider'),
  resetTemperatureButton = document.querySelector('.reset__temperature');

resetTemperatureButton.addEventListener('click', () => {
  let dataToSearch = ['melting-point','boiling-point'];

  temperatureSlider.value = STP;

  setNewTemperature(STP);
  highlightElement(STP, dataToSearch);
  removeClass('--is-visible', resetTemperatureButton, 0);
});

temperatureSlider.addEventListener('input', (self) => {
  let
    currentValue = Number(self.target.value),
    dataToSearch = ['melting-point','boiling-point'];

  if (currentValue !== STP && !resetTemperatureButton.classList.contains('--is-visible')) {
    addClass('--is-visible', resetTemperatureButton, 0);
  } else if (currentValue === STP) {
    removeClass('--is-visible', resetTemperatureButton, 0);
  }

  setNewTemperature(currentValue);
  highlightElement(currentValue, dataToSearch);
});

function setNewTemperature(currentValue) {
  let
    kelvinOutput = document.querySelector('.temperature__inputs__result'),
    celsiusOutput = document.querySelector('.celsius'),
    farenheitOutput = document.querySelector('.farenheit');

  kelvinOutput.innerHTML = `${currentValue} K`;
  celsiusOutput.innerHTML = `${currentValue - 273}ºC`;
  farenheitOutput.innerHTML = `${Math.round((currentValue * 9 / 5 - 460) * 100) / 100}ºF`;
}
