class Helper {
  constructor() {
    this.DELAY = 5;
  }

  addClass(className, element, index) {
    if (element) {
      setTimeout(() => {
        element.classList.add(className);
      }, index * this.DELAY);
    }
  }

  removeClass(className, element, index) {
    if (element) {
      setTimeout(() => {
        element.classList.remove(className);
      }, index * this.DELAY);
    }
  }

  isLanthanoidOrActinoid(elementItem) {
    return elementItem.getAttribute('data-element-name') !== 'Lanthanoids' && elementItem.getAttribute('data-element-name') !== 'Actinoids';
  }

  highlightElement(dataElement, dataToSearch) {
    let
      index = 0,
      elementList = document.querySelectorAll('.element');

    Array.from(elementList).forEach(elementItem => {
      let dataFromElement = elementItem.getAttribute(`data-element-${dataToSearch}`);

      if (dataToSearch === 'group' || dataToSearch === 'period') {
        dataFromElement = Number(dataFromElement);
      }

      if (dataToSearch.length === 2) {
        let
          meltingPoint = Number(elementItem.getAttribute(`data-element-${dataToSearch[0]}`)),
          boilingPoint = Number(elementItem.getAttribute(`data-element-${dataToSearch[1]}`));

        if (!isNaN(meltingPoint) && !isNaN(boilingPoint)) {
          if (dataElement < meltingPoint) {
            elementItem.setAttribute('data-element-state', 'solid');
          }
          else if (dataElement < boilingPoint) {
            if (this.isLanthanoidOrActinoid(elementItem)) {
              elementItem.setAttribute('data-element-state', 'liquid');
            }
          } else {
            elementItem.setAttribute('data-element-state', 'gas');
          }
        } else if (isNaN(boilingPoint)) {
          let elementState = 'unknown';

          if (dataElement < meltingPoint) {
            elementState = 'solid'
          }

          elementItem.setAttribute('data-element-state', elementState);
        }
      }

      if (dataElement === dataFromElement) {
        this.addClass('--is-active', elementItem, index);
      }

      index++;
    });
  }

  equalizeElement() {
    let
      index = 0,
      elementList = document.querySelectorAll('.element');

    Array.from(elementList).forEach(elementItem => {
      this.removeClass('--is-active', elementItem, index);
      index++;
    });
  }
}

export default Helper;
