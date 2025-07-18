// Star Rating Logic
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    highlightStars(star.dataset.value);
  });
  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    if (star.dataset.value <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Review Submission Logic
function submitReview() {
  const name = document.getElementById('reviewer-name').value.trim();
  const text = document.getElementById('review-text').value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (selectedRating === 0) {
    alert('Please select a star rating.');
    return;
  }
  if (text === '') {
    alert('Please write a review.');
    return;
  }

  addReview(name, selectedRating, text);
  document.getElementById('reviewer-name').value = '';
  document.getElementById('review-text').value = '';
  selectedRating = 0;
  highlightStars(0);
}

function addReview(name, rating, text) {
  const reviewsList = document.getElementById('reviews-list');
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review-item';

  let starsHtml = '';
  for (let i = 0; i < rating; i++) starsHtml += '&#9733; ';
  for (let i = rating; i < 5; i++) starsHtml += '&#9734; ';

  reviewDiv.innerHTML = `
    <div class="review-author">${escapeHtml(name)}</div>
    <div class="review-stars">${starsHtml}</div>
    <div class="review-text">${escapeHtml(text)}</div>
  `;
  reviewsList.prepend(reviewDiv);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// Highlight Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});