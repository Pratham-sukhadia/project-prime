/* ============================================================
   PROJECT PRIME — Animation Utilities
   GSAP helpers and animation presets
   ============================================================ */

window.Animations = (() => {
  // Confetti burst for achievements/completions
  function confetti(x, y, count = 30) {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#06b6d4'];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = `${Math.random() * 8 + 4}px`;
      document.body.appendChild(particle);

      if (window.gsap) {
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 400,
          y: Math.random() * 600 + 200,
          rotation: Math.random() * 720 - 360,
          opacity: 0,
          duration: Math.random() * 1.5 + 1,
          ease: 'power2.out',
          onComplete: () => particle.remove()
        });
      } else {
        setTimeout(() => particle.remove(), 2000);
      }
    }
  }

  // Counter animation (count up number)
  function countUp(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(start + (target - start) * eased);
      element.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Haptic feedback
  function haptic(type = 'light') {
    if ('vibrate' in navigator) {
      switch (type) {
        case 'light': navigator.vibrate(10); break;
        case 'medium': navigator.vibrate(20); break;
        case 'heavy': navigator.vibrate([30, 10, 30]); break;
        case 'success': navigator.vibrate([10, 50, 10]); break;
        case 'error': navigator.vibrate([50, 30, 50]); break;
      }
    }
  }

  // Stagger entrance for a list of elements
  function staggerEntrance(selector, container = document) {
    const elements = container.querySelectorAll(selector);
    if (window.gsap && elements.length > 0) {
      gsap.from(elements, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // Pulse animation on element
  function pulse(element) {
    if (window.gsap) {
      gsap.fromTo(element,
        { scale: 1 },
        { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  }

  // Shake animation
  function shake(element) {
    if (window.gsap) {
      gsap.fromTo(element,
        { x: 0 },
        { x: 5, duration: 0.08, yoyo: true, repeat: 5, ease: 'power2.inOut', clearProps: 'x' }
      );
    }
  }

  // Smooth number update
  function animateValue(element, from, to, duration = 800) {
    if (window.gsap) {
      gsap.to({ val: from }, {
        val: to,
        duration: duration / 1000,
        ease: 'power2.out',
        onUpdate: function() {
          element.textContent = Math.round(this.targets()[0].val);
        }
      });
    } else {
      element.textContent = to;
    }
  }

  // Progress ring animation
  function animateProgressRing(element, percentage) {
    const circle = element.querySelector('.progress-ring-fill');
    if (!circle) return;

    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;

    const offset = circumference - (percentage / 100) * circumference;

    if (window.gsap) {
      gsap.fromTo(circle,
        { strokeDashoffset: circumference },
        { strokeDashoffset: offset, duration: 1.2, ease: 'power2.out' }
      );
    } else {
      circle.style.strokeDashoffset = offset;
    }
  }

  return {
    confetti,
    countUp,
    haptic,
    staggerEntrance,
    pulse,
    shake,
    animateValue,
    animateProgressRing
  };
})();
