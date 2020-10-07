import Helper from './helper';

class GroupPeriod extends Helper {
  constructor(props) {
    super(props);

    this.periodList = document.querySelectorAll('.period__item');
    this.groupList = document.querySelectorAll('.group__item');

    this.init();
  }

  static run() {
    new GroupPeriod();
  }

  init() {
    Array.from(this.groupList).forEach(groupItem => {
      groupItem.addEventListener('mouseenter', (self) => {
        let
          groupNumber = Number(self.target.firstChild.innerHTML),
          dataToSearch = 'group';

        this.highlightElement(groupNumber, dataToSearch);
      });

      groupItem.addEventListener('mouseleave', () => {
        this.equalizeElement();
      });
    });

    Array.from(this.periodList).forEach(periodItem => {
      periodItem.addEventListener('mouseenter', (self) => {
        let
          periodNumber = Number(self.target.firstChild.innerHTML),
          dataToSearch = 'period';

        this.highlightElement(periodNumber, dataToSearch);
      });

      periodItem.addEventListener('mouseleave', () => {
        this.equalizeElement();
      });
    });

    window.addEventListener('scroll', () => {
      let
        scrollY = window.scrollY > 0,
        scrollX = window.scrollX > 0,
        period = document.querySelector('.period__list'),
        group = document.querySelector('.group__list');

      if (scrollX) {
        this.addClass('--is-fixed', period, 0);
        period.style.left = `${window.scrollX}px`;
      } else{
        this.removeClass('--is-fixed', period, 0);
        period.style.left = 0;
      }

      if (scrollY) {
        this.addClass('--is-fixed', group, 0);
      } else {
        this.removeClass('--is-fixed', group, 0);
      }
    });
  }
}

export default GroupPeriod;
