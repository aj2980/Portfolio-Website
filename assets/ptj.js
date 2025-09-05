const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Function to fetch LeetCode stats
function fetchLeetCodeStats() {
  fetch('https://leetcode-api-faisalshohag.vercel.app/aj2980')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update the stats in the DOM
      document.getElementById('leetcode-solved').textContent = data.totalSolved || '--';
      document.getElementById('leetcode-easy').textContent = data.easySolved || '--';
      document.getElementById('leetcode-medium').textContent = data.mediumSolved || '--';
      // document.getElementById('leetcode-hard').textContent = data.hardSolved || '--';
    })
    .catch(error => {
      console.error('Error fetching LeetCode stats:', error);
      // Set fallback values in case of error
      document.getElementById('leetcode-solved').textContent = '300+';
      document.getElementById('leetcode-easy').textContent = '150+';
      document.getElementById('leetcode-medium').textContent = '120+';
      // document.getElementById('leetcode-hard').textContent = '30+';
    });
}

// Function to fetch GeeksforGeeks stats
function fetchGFGStats() {
  fetch('https://gfg-stats.tashif.codes/jainabhi7mb6/profile')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update the stats in the DOM
      document.getElementById('gfg-rank').textContent = data.instituteRank;
      document.getElementById('gfg-score').textContent = data.codingScore;
      document.getElementById('gfg-problems').textContent = data.totalProblemsSolved;
    })
    .catch(error => {
      console.error('Error fetching GFG stats:', error);
      // Optional: fallback values
      document.getElementById('gfg-rank').textContent = '223';
      document.getElementById('gfg-score').textContent = '550+';
      document.getElementById('gfg-problems').textContent = '150+';
    });
}


// Call these functions when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  fetchLeetCodeStats();
  fetchGFGStats();
});

// Word rotator for hero__title
const heroTitle = document.querySelector('.hero__title');
const words = ["Abhishek Jain", "Full Stack Developer", "AIML Developer"];
let wordIndex = 0;
let index = 0;
let isDeleting = false;
let speed = 150; // moderate speed

function type() {
  if (!heroTitle) return;

  const currentWord = words[wordIndex];
  const prefix = "Hi, I'm ";

  if (!isDeleting && index <= currentWord.length) {
    heroTitle.textContent = prefix + currentWord.substring(0, index);
    index++;
  } else if (isDeleting && index >= 0) {
    heroTitle.textContent = prefix + currentWord.substring(0, index);
    index--;
  }

  if (index === currentWord.length + 1) {
    isDeleting = true;
    speed = 100; // speed while deleting
  } else if (index === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 150; // speed while typing
  }

  setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

// Counter animation for hero__info-cards
function animateCounters() {
  const counters = document.querySelectorAll('.hero__info-title');
  const duration = 2000; // Animation duration in milliseconds

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const start = +counter.innerText.replace('+', '') || 0;
    const startTime = performance.now();
    const hasPlus = counter.innerText.includes('+');

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      counter.innerText = current + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.innerText = target + (hasPlus ? '+' : '');
      }
    };

    requestAnimationFrame(animate);
  });
}

// Intersection Observer for counter animation
const heroSection = document.querySelector('.hero');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (heroSection) {
  counterObserver.observe(heroSection);
}

// Fade-in animation on scroll
const fadeInSections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
  threshold: 0.1, // Trigger when 10% of the section is visible
  rootMargin: '0px 0px -50px 0px' // Adjust as needed
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, observerOptions);

fadeInSections.forEach(section => {
  observer.observe(section);
});
