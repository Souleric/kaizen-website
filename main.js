// Animations and Parallax Effects
document.addEventListener('DOMContentLoaded', () => {
  // 1. Motion Car Parallax (Hero Section)
  const motionCar = document.getElementById('motion-car');
  if (motionCar) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const speed = 1.5;
      const translateX = -(scrollY * speed);
      
      motionCar.style.transform = `translate(calc(${translateX}px), -50%)`;
      
      const maxScroll = window.innerHeight;
      const opacity = Math.max(0.9 - (scrollY / maxScroll), 0);
      motionCar.style.opacity = opacity;
    });
  }

  // 2. Service Cards Scroll Animation
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    serviceCards.forEach(card => cardObserver.observe(card));
  }

  // 3. Services Video — play on enter, hold last frame when scrolled past, reset when scrolled back above
  const video = document.getElementById('services-video');

  if (video) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top > 0) {
            // Video is below the viewport — user scrolled back up above it
            video.pause();
            video.currentTime = 0;
          }
          // rect.top < 0 means video is above viewport (scrolled past) — stay on last frame
        }
      });
    }, { threshold: 0.3 });

    observer.observe(video);
  }
});
