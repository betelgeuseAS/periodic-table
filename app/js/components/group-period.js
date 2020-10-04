let
  periodList = document.querySelectorAll('.period__item'),
  groupList = document.querySelectorAll('.group__item');

Array.from(groupList).forEach(groupItem => {
  groupItem.addEventListener('mouseenter', (self) => {
    let
      groupNumber = Number(self.target.firstChild.innerHTML),
      dataToSearch = 'group';

    highlightElement(groupNumber, dataToSearch);
  });

  groupItem.addEventListener('mouseleave', () => {
    equalizeElement();
  });
});

Array.from(periodList).forEach(periodItem => {
  periodItem.addEventListener('mouseenter', (self) => {
    let
      periodNumber = Number(self.target.firstChild.innerHTML),
      dataToSearch = 'period';

    highlightElement(periodNumber, dataToSearch);
  });

  periodItem.addEventListener('mouseleave', () => {
    equalizeElement();
  });
});

window.addEventListener('scroll', () => {
  let
    scrollY = window.scrollY > 0,
    scrollX = window.scrollX > 0,
    period = document.querySelector('.period__list'),
    group = document.querySelector('.group__list');

  if (scrollX) {
    addClass('--is-fixed', period, 0);
    period.style.left = `${window.scrollX}px`;
  } else{
    removeClass('--is-fixed', period, 0);
    period.style.left = 0;
  }

  if (scrollY) {
    addClass('--is-fixed', group, 0);
  } else {
    removeClass('--is-fixed', group, 0);
  }
});
