// Configuration Object
const sidebarConfig = [
    { type: 'upload', label: 'PNG, JPG, WEBP' },
    { type: 'slider', label: 'SIZE', id: 'size-slider', min: 1, max: 100, value: 33 },
    { type: 'slider', label: 'THRESHOLD', id: 'threshold-slider', min: 0, max: 100, value: 46 },
    { type: 'dropdown', label: 'DITHERING METHOD', id: 'dither-menu', options: ['BITMAP', 'FLOYD-STEINBERG', 'ATKINSON', 'JARVIS-JUDICE-NINKE', 'STUCKI', 'BAYER 2X2', 'BAYER 4X4', 'BAYER 8X8', 'CLUSTERED 4X4', 'RANDOM'] },
    { type: 'button', label: 'SHOP' },
    { type: 'button', label: 'INFO' },
    { type: 'button-dropdown', label: 'LOG IN', icon: 'chevron-right' },
    { type: 'input', label: 'LOG IN FOR SVG', placeholder: 'SVG' },
    { type: 'info', text: '10 LEFT BEFORE LOG IN' },
    { type: 'dropdown', label: 'DOWNLOAD AS', id: 'format-menu', options: ['SVG', 'PNG', 'JPG'] }
  ];
  
  // Utility Functions
  function createLabel(text) {
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = text;
    return label;
  }
  
  function createButton(text, primary = false, dropdown = false, icon = 'chevron-down') {
    const button = document.createElement('button');
    button.className = dropdown ? 'dropdown-button' : 'btn';
    if (primary) button.classList.add('primary');
    button.innerHTML = `${text} <i data-lucide="${icon}" class="lucide"></i>`;
    return button;
  }
  
  function createInput(placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.className = 'input';
    return input;
  }
  
  function createSlider(id, min, max, value) {
    const container = document.createElement('div');
    container.className = 'slider-container';
    container.innerHTML = `
      <input type="range" id="${id}" min="${min}" max="${max}" value="${value}" />
      <div class="slider-value" id="${id}-value">${value}</div>
    `;
    return container;
  }
  
  function createDropdown(id, options) {
    const container = document.createElement('div');
    container.className = 'dropdown-menu';
    container.id = id;
    container.innerHTML = options.map(opt => `<div class="dropdown-item">${opt}</div>`).join('');
    return container;
  }
  
  function renderSidebar(config) {
    const sidebarContent = document.getElementById('sidebar-content');
  
    config.forEach(item => {
      if (item.type === 'upload') {
        sidebarContent.appendChild(createLabel(item.label));
        const uploadBtn = createButton('UPLOAD', true, true, 'chevron-up');
        uploadBtn.classList.add('upload-button');
        sidebarContent.appendChild(uploadBtn);
      }
  
      if (item.type === 'slider') {
        sidebarContent.appendChild(createLabel(item.label));
        sidebarContent.appendChild(createSlider(item.id, item.min, item.max, item.value));
      }
  
      if (item.type === 'dropdown') {
        sidebarContent.appendChild(createLabel(item.label));
        const btn = createButton('SELECT OPTION', true, true);
        btn.setAttribute('onclick', `toggleDropdown('${item.id}')`);
        sidebarContent.appendChild(btn);
        sidebarContent.appendChild(createDropdown(item.id, item.options));
      }
  
      if (item.type === 'button') {
        sidebarContent.appendChild(createButton(item.label));
      }
  
      if (item.type === 'button-dropdown') {
        sidebarContent.appendChild(createButton(item.label, false, true, item.icon));
      }
  
      if (item.type === 'input') {
        sidebarContent.appendChild(createLabel(item.label));
        sidebarContent.appendChild(createInput(item.placeholder));
      }
  
      if (item.type === 'info') {
        const info = document.createElement('div');
        info.className = 'label';
        info.textContent = item.text;
        sidebarContent.appendChild(info);
      }
    });
  
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerHTML = '© 2025 Typegraph';
    sidebarContent.appendChild(footer);
  }
  
  function toggleDropdown(id) {
    const menu = document.getElementById(id);
    const button = document.querySelector(`[onclick="toggleDropdown('${id}')"]`);
    const icon = button.querySelector('.lucide');
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      gsap.to(icon, { rotation: 0, duration: 0.25, ease: 'power2.inOut' });
    } else {
      closeAllDropdowns();
      menu.classList.add('active');
      gsap.to(icon, { rotation: 180, duration: 0.25, ease: 'power2.inOut' });
    }
  }
  
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
      menu.classList.remove('active');
      const button = menu.previousElementSibling;
      const icon = button?.querySelector('.lucide');
      if (icon) gsap.to(icon, { rotation: 0, duration: 0.25, ease: 'power2.inOut' });
    });
  }
  
  function bindEvents() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-button') && !e.target.closest('.dropdown-menu')) {
        closeAllDropdowns();
      }
    });
  
    document.querySelectorAll('.btn, .dropdown-button, .upload-button').forEach(button => {
      button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.4, ease: 'power2.out' }));
      button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.4, ease: 'power2.inOut' }));
    });
  }
  
  function initSliders() {
    ['size-slider', 'threshold-slider'].forEach(id => {
      const slider = document.getElementById(id);
      const value = document.getElementById(`${id}-value`);
      if (slider) {
        slider.addEventListener('input', () => {
          value.textContent = slider.value;
          const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
          slider.style.setProperty('--progress', `${percentage}%`);
        });
        slider.dispatchEvent(new Event('input'));
      }
    });
  }
  
  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    renderSidebar(sidebarConfig);
    lucide.createIcons();
    bindEvents();
    initSliders();
  });
  