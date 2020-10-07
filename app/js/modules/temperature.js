import Helper from './helper';

class Temperature extends Helper {
  constructor(props) {
    super(props);

    this.STP = 273;

    this.temperatureSlider = document.querySelector('.temperature__inputs__slider');
    this.resetTemperatureButton = document.querySelector('.reset__temperature');

    this.init();
  }

  static run() {
    new Temperature();
  }

  init() {
    this.resetTemperatureButton.addEventListener('click', () => {
      let dataToSearch = ['melting-point','boiling-point'];

      this.temperatureSlider.value = this.STP;

      this.setNewTemperature(this.STP);
      this.highlightElement(this.STP, dataToSearch);
      this.removeClass('--is-visible', this.resetTemperatureButton, 0);
    });

    this.temperatureSlider.addEventListener('input', (self) => {
      let
        currentValue = Number(self.target.value),
        dataToSearch = ['melting-point','boiling-point'];

      if (currentValue !== this.STP && !this.resetTemperatureButton.classList.contains('--is-visible')) {
        this.addClass('--is-visible', this.resetTemperatureButton, 0);
      } else if (currentValue === this.STP) {
        this.removeClass('--is-visible', this.resetTemperatureButton, 0);
      }

      this.setNewTemperature(currentValue);
      this.highlightElement(currentValue, dataToSearch);
    });
  }

  setNewTemperature(currentValue) {
    let
      kelvinOutput = document.querySelector('.temperature__inputs__result'),
      celsiusOutput = document.querySelector('.celsius'),
      farenheitOutput = document.querySelector('.farenheit');

    kelvinOutput.innerHTML = `${currentValue} K`;
    celsiusOutput.innerHTML = `${currentValue - 273}ºC`;
    farenheitOutput.innerHTML = `${Math.round((currentValue * 9 / 5 - 460) * 100) / 100}ºF`;
  }
}

export default Temperature;
