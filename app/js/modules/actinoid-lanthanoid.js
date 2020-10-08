import Helper from './helper';

class ActinoidLanthanoid extends Helper {
  constructor(props) {
    super(props);

    this.actinoidBox = document.querySelector(`[data-element-name='Actinoids']`);
    this.lanthanoidBox = document.querySelector(`[data-element-name='Lanthanoids']`);

    this.init();
  }

  static run() {
    new ActinoidLanthanoid();
  }

  init() {
    this.actinoidBox.addEventListener('mouseenter', (self) =>{
      let
        dataActinoids = self.target.getAttribute('data-element-type'),
        dataToSearch = 'type';

      this.highlightElement(dataActinoids, dataToSearch);
    });

    this.actinoidBox.addEventListener('mouseleave', () =>{
      this.equalizeElement();
    });

    this.lanthanoidBox.addEventListener('mouseenter', (self) =>{
      let
        dataLantanoids = self.target.getAttribute('data-element-type'),
        dataToSearch = 'type';

      this.highlightElement(dataLantanoids, dataToSearch);
    });

    this.lanthanoidBox.addEventListener('mouseleave', () =>{
      this.equalizeElement();
    });
  }
}

export default ActinoidLanthanoid;
