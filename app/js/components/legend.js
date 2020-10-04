let legendList = document.querySelectorAll('.legend-box');

Array.from(legendList).forEach(legendItem => {
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

    highlightElement(legendData, dataToSearch);
  });

  legendItem.addEventListener('mouseleave', () => {
    equalizeElement();
  });
});
