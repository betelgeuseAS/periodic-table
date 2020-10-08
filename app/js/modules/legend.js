import Helper from './helper';

class Legend extends Helper {
  constructor(props) {
    super(props);

    this.legendList = document.querySelectorAll('.legend-box');

    this.init();
  }

  static run() {
    new Legend();
  }

  init() {
    Array.from(this.legendList).forEach(legendItem => {
      legendItem.addEventListener('mouseenter', (self) => {
        let
          legendData,
          dataToSearch;

        if (legendItem.getAttribute('data-element-type')) {
          legendData = self.target.getAttribute('data-element-type');
          dataToSearch = 'type';
        } else {
          legendData = self.target.getAttribute('data-element-state');
          dataToSearch = 'state';
        }

        this.highlightElement(legendData, dataToSearch);
      });

      legendItem.addEventListener('mouseleave', () => {
        this.equalizeElement();
      });
    });
  }
}

export default Legend;
