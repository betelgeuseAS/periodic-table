const ELEMENT_MODAL_DATA = elementsDescription;

let
  elementList = document.querySelectorAll('.element'),
  modalBox = document.querySelector('.modal'),
  modalContent = document.querySelector('.modal__content'),
  modalProperties = document.querySelector('.modal__content__properties'),
  modalClose = document.querySelector('.modal__close'),
  isOpen = false,
  elementClicked;

modalClose.addEventListener('click', closeModal);
modalBox.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27 && isOpen) {
    closeModal(event);
  }
});

Array.from(elementList).forEach(elementItem => {
  elementItem.addEventListener('click', () =>{
    if (isLanthanoidOrActinoid(elementItem)) {
      elementClicked = elementItem;
      let elementName = elementClicked.getAttribute('data-element-name');

      modalAnimation(elementItem);
      createModalContent(elementName);
    }
  });
});

function createModalContent(elementName) {
  let elementData = ELEMENT_MODAL_DATA[elementName] || ELEMENT_MODAL_DATA['Empty'];

  Object
    .keys(elementData)
    .forEach(key =>
      modalProperties.innerHTML += `<p class='element-property element-${key}'>${elementData[key]}</p>`
    );
}

function removeModalContent() {
  modalProperties.innerHTML = '';
}

function modalAnimation(self) {
  let
    selfProperties = self.getBoundingClientRect(),
    modalProperties = modalContent.getBoundingClientRect(),
    tooltip = self.querySelector('.tooltip'),
    translateX,
    translateY,
    scale,
    positionX = window.innerWidth / 2,
    positionY = window.innerHeight / 2;

  addClass('--is-hidden', tooltip, 0);
  addClass('--is-triggered', self, 0);
  addClass('modal__background', modalBox, 0);

  scale = modalProperties.width /  100;
  translateX = Math.round(positionX - selfProperties.left - selfProperties.width / 2);
  translateY = Math.round(positionY - selfProperties.top - selfProperties.height / 2);
  self.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  window.requestAnimationFrame(() => {
    openModal();
  });
}

function openModal() {
  if (!isOpen) {
    let content = modalBox.querySelector('.modal__content');

    addClass('--is-visible', modalBox, 0);
    addClass('--is-visible', content, 75);

    content.addEventListener('transitionend', hideContent(content), false);

    isOpen = true;
  }
}

function hideContent(content) {
  content.removeEventListener('transitionend', hideContent, false);
}

function closeModal(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  let
    target = event.target,
    tooltip = elementClicked.querySelector('.tooltip');

  if (isOpen && target.classList.contains('modal__background') || target.classList.contains('modal__close') || event.keyCode === 27) {
    removeClass('--is-visible', modalBox, 0);
    removeClass('--is-visible', modalContent, 0);

    elementClicked.removeAttribute('style');

    removeClass('--is-triggered', elementClicked, 0);
    removeClass('modal__background', modalBox, 0);
    removeClass('--is-hidden', tooltip, 0);

    removeModalContent();

    elementClicked = '';
    isOpen = false;
  }
}
