
// 🔁 Scroll Spy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
});

// ✨ Scroll Reveal
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 🌌 Milky Way Starfield Background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars(count) {
  stars = [];
  const colors = ["#ffffff", "#49c5b6", "#aad1f3", "#ccc1ff", "#ffe9fc"];


  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      velocity: Math.random() * 0.3 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function drawStars() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width
  );
  gradient.addColorStop(0, "#0d0221");
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    ctx.beginPath();
    const flicker = Math.random() * 0.3 + 0.7;
    const currentRadius = star.radius * flicker;
    ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    const dx = Math.cos(s.angle) * s.length;
    const dy = Math.sin(s.angle) * s.length;

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - dx, s.y - dy);
    ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed;
    s.opacity -= 0.01;

    if (s.opacity <= 0) shootingStars.splice(i, 1);
  }
}

function createShootingStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  shootingStars.push({
    x,
    y,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 6 + 6,
    angle: Math.PI / 4,
    opacity: 1
  });
}

// 🐭 Parallax
let mouseX = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
});

function moveStars() {
  stars.forEach((star) => {
    star.y += star.velocity;
    star.x += mouseX * 0.3;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
    if (star.x > canvas.width || star.x < 0) {
      star.x = Math.random() * canvas.width;
    }
  });
}

function animateStars() {
  drawStars();
  drawShootingStars();
  moveStars();

  if (Math.random() < 0.02) {
    createShootingStar();
  }

  requestAnimationFrame(animateStars);
}

createStars(300);
animateStars();

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("hidden");
}
