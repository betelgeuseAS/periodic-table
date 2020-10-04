let
  actinoidBox = document.querySelector(`[data-element-name='Actinoids']`),
  lanthanoidBox = document.querySelector(`[data-element-name='Lanthanoids']`);

actinoidBox.addEventListener('mouseenter', (self) =>{
  let
    dataActinoids = self.target.getAttribute('data-element-type'),
    dataToSearch = 'type';

  highlightElement(dataActinoids, dataToSearch);
});

actinoidBox.addEventListener('mouseleave', () =>{
  equalizeElement();
});

lanthanoidBox.addEventListener('mouseenter', (self) =>{
  let
    dataLantanoids = self.target.getAttribute('data-element-type'),
    dataToSearch = 'type';

  highlightElement(dataLantanoids, dataToSearch);
});

lanthanoidBox.addEventListener('mouseleave', () =>{
  equalizeElement();
});
