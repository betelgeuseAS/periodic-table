const DELAY = 5;

function addClass(className, element, index) {
  if (element) {
    setTimeout(() => {
      element.classList.add(className);
    }, index * DELAY);
  }
}

function removeClass(className, element, index) {
  if (element) {
    setTimeout(() => {
      element.classList.remove(className);
    }, index * DELAY);
  }
}

function isLanthanoidOrActinoid(elementItem) {
  return elementItem.getAttribute('data-element-name') !== 'Lanthanoids' && elementItem.getAttribute('data-element-name') !== 'Actinoids';
}

function highlightElement(dataElement, dataToSearch) {
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
          if (isLanthanoidOrActinoid(elementItem)) {
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
      addClass('--is-active', elementItem, index);
    }

    index++;
  });
}

function equalizeElement() {
  let
    index = 0,
    elementList = document.querySelectorAll('.element');

  Array.from(elementList).forEach(elementItem => {
    removeClass('--is-active', elementItem, index);
    index++;
  });
}
