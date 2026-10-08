// ============ قائمة الموبايل ============
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// إغلاق القائمة عند اختيار رابط
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ سنة التذييل ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ حاسبة الاستهلاك ============
const form = document.getElementById('calc-form');
const deviceList = document.getElementById('device-list');
const totalMonthlyEl = document.getElementById('total-monthly');
const totalSavingsEl = document.getElementById('total-savings');
const resetBtn = document.getElementById('reset-calc');

// تخزين الأجهزة المضافة
let devices = [];

// معدل الاستهلاك الشهري = القدرة × الساعات × العدد × 30 / 1000
function calculateDevice(device) {
  return (device.power * device.hours * device.count * 30) / 1000;
}

// توفير ساعة واحدة يومياً لكل جهاز
function calculateSavings(device) {
  return (device.power * 1 * device.count * 30) / 1000;
}

function renderDevices() {
  deviceList.innerHTML = '';

  if (devices.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-msg';
    li.textContent = 'لم تُضف أي أجهزة بعد.';
    deviceList.appendChild(li);
  } else {
    devices.forEach((device, index) => {
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${device.name} — ${device.power} واط × ${device.hours} ساعة × ${device.count}`;
      const valueSpan = document.createElement('span');
      valueSpan.textContent = `${calculateDevice(device).toFixed(1)} ك.و.س/شهر`;
      li.appendChild(nameSpan);
      li.appendChild(valueSpan);
      deviceList.appendChild(li);
    });
  }

  const totalMonthly = devices.reduce((sum, d) => sum + calculateDevice(d), 0);
  const totalSavings = devices.reduce((sum, d) => sum + calculateSavings(d), 0);

  totalMonthlyEl.textContent = totalMonthly.toFixed(1);
  totalSavingsEl.textContent = totalSavings.toFixed(1);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('device-name').value.trim();
  const power = parseFloat(document.getElementById('device-power').value);
  const hours = parseFloat(document.getElementById('device-hours').value);
  const count = parseInt(document.getElementById('device-count').value);

  if (!name || isNaN(power) || isNaN(hours) || isNaN(count)) {
    return;
  }

  devices.push({ name, power, hours, count });
  renderDevices();
  form.reset();
  document.getElementById('device-count').value = 1;
});

resetBtn.addEventListener('click', () => {
  devices = [];
  renderDevices();
});

// تهيئة أولية
renderDevices();