'use strict';

// Mobile menu functionality
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  };

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);
}

// Accordion functionality
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    const submenu = this.parentElement.querySelector('[data-accordion]');
    const isActive = submenu.classList.contains('active');

    for (let j = 0; j < accordion.length; j++) {
      if (accordion[j].classList.contains('active') && accordion[j] !== submenu) {
        accordion[j].classList.remove('active');
        accordion[j].style.maxHeight = null;
        accordionBtn[j].classList.remove('active');
      }
    }

    submenu.classList.toggle('active');
    this.classList.toggle('active');

    if (submenu.classList.contains('active')) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
    } else {
      submenu.style.maxHeight = null;
    }
  });
}


const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('cart-sidebar');

cartButton.addEventListener('click', () => {
  cartSidebar.classList.toggle('active');
});
