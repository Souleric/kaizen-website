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

  // 2. Years counter — count up on enter, reset on scroll back above
  const yearsCount = document.getElementById('years-count');
  if (yearsCount) {
    const target = 10;
    const duration = 1200; // ms
    let rafId = null;

    const countUp = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        yearsCount.textContent = Math.round(eased * target);
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const resetCount = () => {
      if (rafId) cancelAnimationFrame(rafId);
      yearsCount.textContent = '0';
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp();
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top > 0) {
            // scrolled back up above the section — reset
            resetCount();
          }
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(yearsCount);
  }

  // 3. Service Cards Scroll Animation
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

  // 4. Hero mobile video — play once on enter, hold last frame; replay on scroll back
  const heroVideo = document.getElementById('hero-mobile-video');

  if (heroVideo) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible — replay from start
          heroVideo.currentTime = 0;
          heroVideo.play();
        }
        // When scrolled away, video has already stopped at last frame (no loop)
      });
    }, { threshold: 0.3 });

    heroObserver.observe(heroVideo);
  }
});
