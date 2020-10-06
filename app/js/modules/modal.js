import Helper from './helper';
import elementsDescription from '../data/periodic-table-data';

class Modal extends Helper {
  constructor(props) {
    super(props);

    this.ELEMENT_MODAL_DATA = elementsDescription;

    this.elementList = document.querySelectorAll('.element');
    this.modalBox = document.querySelector('.modal');
    this.modalContent = document.querySelector('.modal__content');
    this.modalProperties = document.querySelector('.modal__content__properties');
    this.modalClose = document.querySelector('.modal__close');
    this.isOpen = false;
    this.elementClicked = '';

    this.init();
  }

  static run() {
    new Modal();
  }

  init() {
    this.modalClose.addEventListener('click', (event) => {
      this.closeModal(event);
    });

    this.modalBox.addEventListener('click', (event) => {
      this.closeModal(event);
    });

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27 && this.isOpen) {
        this.closeModal(event);
      }
    });

    Array.from(this.elementList).forEach(elementItem => {
      elementItem.addEventListener('click', () => {
        if (this.isLanthanoidOrActinoid(elementItem)) {
          this.elementClicked = elementItem;
          let elementName = this.elementClicked.getAttribute('data-element-name');

          this.modalAnimation(elementItem);
          this.createModalContent(elementName);
        }
      });
    });
  }

  createModalContent(elementName) {
    let elementData = this.ELEMENT_MODAL_DATA[elementName] || this.ELEMENT_MODAL_DATA['Empty'];

    Object
      .keys(elementData)
      .forEach(key =>
        this.modalProperties.innerHTML += `<p class='element-property element-${key}'>${elementData[key]}</p>`
      );
  }

  removeModalContent() {
    this.modalProperties.innerHTML = '';
  }

  modalAnimation(self) {
    let
      selfProperties = self.getBoundingClientRect(),
      modalProperties = this.modalContent.getBoundingClientRect(),
      tooltip = self.querySelector('.tooltip'),
      translateX,
      translateY,
      scale,
      positionX = window.innerWidth / 2,
      positionY = window.innerHeight / 2;

    this.addClass('--is-hidden', tooltip, 0);
    this.addClass('--is-triggered', self, 0);
    this.addClass('modal__background', this.modalBox, 0);

    scale = modalProperties.width /  100;
    translateX = Math.round(positionX - selfProperties.left - selfProperties.width / 2);
    translateY = Math.round(positionY - selfProperties.top - selfProperties.height / 2);
    self.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    window.requestAnimationFrame(() => {
      this.openModal();
    });
  }

  openModal() {
    if (!this.isOpen) {
      let content = this.modalBox.querySelector('.modal__content');

      this.addClass('--is-visible', this.modalBox, 0);
      this.addClass('--is-visible', content, 75);

      content.addEventListener('transitionend', this.hideContent(content), false);

      this.isOpen = true;
    }
  }

  hideContent(content) {
    content.removeEventListener('transitionend', this.hideContent, false);
  }

  closeModal(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    let
      target = event.target,
      tooltip = this.elementClicked.querySelector('.tooltip');

    if (this.isOpen && target.classList.contains('modal__background') || target.classList.contains('modal__close') || event.keyCode === 27) {
      this.removeClass('--is-visible', this.modalBox, 0);
      this.removeClass('--is-visible', this.modalContent, 0);

      this.elementClicked.removeAttribute('style');

      this.removeClass('--is-triggered', this.elementClicked, 0);
      this.removeClass('modal__background', this.modalBox, 0);
      this.removeClass('--is-hidden', tooltip, 0);

      this.removeModalContent();

      this.elementClicked = '';
      this.isOpen = false;
    }
  }
}

export default Modal;
