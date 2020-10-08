import Modal from './modules/modal.js';
import GroupPeriod from './modules/group-period.js';
import Temperature from "./modules/temperature";
import Legend from "./modules/legend";
import ActinoidLanthanoid from "./modules/actinoid-lanthanoid";

document.addEventListener('DOMContentLoaded', function () {
  Modal.run();
  GroupPeriod.run();
  Temperature.run();
  Legend.run();
  ActinoidLanthanoid.run();
});
