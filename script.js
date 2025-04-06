const text = document.getElementById('animated-text');
let phrases = [
  'Welcome to My World 🌍',
  'Explore. Build. Inspire.',
  'Powered by GitHub Pages 💻',
  'Let’s create something amazing ✨'
];

let index = 0;

setInterval(() => {
  index = (index + 1) % phrases.length;
  text.style.opacity = 0;
  setTimeout(() => {
    text.textContent = phrases[index];
    text.style.opacity = 1;
  }, 300);
}, 4000);
