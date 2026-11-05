const partContent = {
  motor: {
    label: 'Power system',
    title: 'Motor',
    description:
      'The motor provides the force that pulls the elevator car up and lowers it down. It works with the drive system to control speed smoothly and safely.',
    shape: 'motor'
  },
  rope: {
    label: 'Lift mechanism',
    title: 'Hoist ropes',
    description:
      'Steel ropes connect the car to a pulley system. When the motor turns, the ropes move the car with the help of a counterweight that balances the load.',
    shape: 'rope'
  },
  counterweight: {
    label: 'Balance system',
    title: 'Counterweight',
    description:
      'The counterweight balances part of the elevator car weight. This helps the motor use less energy and makes movement smoother.',
    shape: 'counterweight'
  },
  controller: {
    label: 'Brain of the elevator',
    title: 'Controller',
    description:
      'The controller reads the floor calls, tracks the current position, and decides when to move, stop, and open doors at the correct floor.',
    shape: 'controller'
  },
  door: {
    label: 'Entry system',
    title: 'Doors',
    description:
      'The doors open and close at each floor. Sensors make sure the doors do not close while someone or something is in the way.',
    shape: 'door'
  },
  brake: {
    label: 'Safety system',
    title: 'Safety brake',
    description:
      'The brake stops the car if it moves too fast or if there is a problem. It is one of the most important safety features in the elevator.',
    shape: 'brake'
  }
};

const floors = [1, 2, 3, 4, 5];
let currentFloor = 1;
let isMoving = false;

const elevatorCar = document.getElementById('elevatorCar');
const systemStatus = document.getElementById('systemStatus');
const currentFloorReadout = document.getElementById('currentFloorReadout');
const partVisual = document.getElementById('partVisual');
const partTitle = document.getElementById('partTitle');
const partDescription = document.getElementById('partDescription');
const partLabel = document.getElementById('partLabel');
const demoBtn = document.getElementById('demoBtn');
const resetBtn = document.getElementById('resetBtn');
const openDoorBtn = document.getElementById('openDoorBtn');
const floorButtons = [...document.querySelectorAll('.floor-btn, .call-btn')];
const partButtons = [...document.querySelectorAll('.part-item')];

function updateStatus(message) {
  systemStatus.textContent = message;
}

function updateFloorReadout() {
  currentFloorReadout.textContent = `Floor ${currentFloor}`;
}

function moveCarTo(floor) {
  if (isMoving || floor === currentFloor) return;

  isMoving = true;
  const floorHeight = 20;
  const targetBottom = (floor - 1) * floorHeight;
  elevatorCar.style.bottom = `${targetBottom}%`;
  updateStatus(`Moving to floor ${floor}`);

  setTimeout(() => {
    currentFloor = floor;
    updateFloorReadout();
    isMoving = false;
    updateStatus('Arrived');
    setTimeout(() => updateStatus('Ready'), 900);
  }, 1600);
}

function setDoorState(open) {
  elevatorCar.classList.toggle('is-open', open);
  updateStatus(open ? 'Doors open' : 'Doors closed');
}

function selectPart(partKey) {
  const info = partContent[partKey];
  if (!info) return;

  partTitle.textContent = info.title;
  partDescription.textContent = info.description;
  partLabel.textContent = info.label;

  partVisual.innerHTML = `<div class="shape ${info.shape}"></div>`;

  partButtons.forEach((button) => {
    const active = button.dataset.part === partKey;
    button.classList.toggle('active', active);
  });
}

function bindButtons() {
  floorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const floor = Number(button.dataset.floor);
      moveCarTo(floor);
      setDoorState(false);
    });
  });

  partButtons.forEach((button) => {
    button.addEventListener('click', () => selectPart(button.dataset.part));
  });

  openDoorBtn.addEventListener('click', () => {
    setDoorState(true);
    setTimeout(() => setDoorState(false), 1400);
  });

  demoBtn.addEventListener('click', () => {
    const sequence = [5, 3, 2, 4, 1];
    let index = 0;

    const runNext = () => {
      if (index >= sequence.length) {
        updateStatus('Demo complete');
        setTimeout(() => updateStatus('Ready'), 1000);
        return;
      }

      const nextFloor = sequence[index];
      index += 1;
      moveCarTo(nextFloor);
      setTimeout(() => {
        setDoorState(true);
        setTimeout(() => setDoorState(false), 700);
      }, 1000);
      setTimeout(runNext, 2600);
    };

    runNext();
  });

  resetBtn.addEventListener('click', () => {
    currentFloor = 1;
    elevatorCar.style.bottom = '0%';
    updateFloorReadout();
    updateStatus('Ready');
    setDoorState(false);
  });
}

function init() {
  updateFloorReadout();
  updateStatus('Ready');
  selectPart('motor');
  bindButtons();
}

init();
