import Modal from './modules/modal.js';
import GroupPeriod from './modules/group-period.js';
import Temperature from "./modules/temperature";

document.addEventListener('DOMContentLoaded', function () {
  Modal.run();
  GroupPeriod.run();
  Temperature.run();
});
