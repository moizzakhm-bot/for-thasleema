/**
 * For Thasleema Nasreen — Interactive Scripts
 * Pure vanilla JavaScript with Web Audio API synthesizer for ambient music
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initAmbientCanvas();
  initBreathingCycle();
  initAccordions();
  initSmileGenerator();
  initForgivenessAction();
  initLoveJar();
  initSnapsLightbox();
});

/* ============================================================
   1. AMBIENT BACKGROUND CANVAS (Floating Hearts & Stars)
============================================================ */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(28, Math.floor(width / 35));

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.45 + 0.25;
      this.type = Math.random() > 0.4 ? 'heart' : 'circle';
      this.color = Math.random() > 0.5 ? 'rgba(214, 69, 98,' : 'rgba(255, 179, 193,';
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = `${this.color} ${this.opacity})`;

      if (this.type === 'heart') {
        const s = this.size / 16;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 5, -s * 8, -s * 15, -s * 2, 0, s * 10);
        ctx.bezierCurveTo(s * 15, -s * 2, s * 5, -s * 8, 0, 0);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ============================================================
   2. CALMING BREATHING CYCLE
============================================================ */
function initBreathingCycle() {
  const breathText = document.getElementById('breath-text');
  if (!breathText) return;

  const cycle = [
    { text: 'Inhale Peace...', duration: 4000 },
    { text: 'Hold Gently...', duration: 4000 },
    { text: 'Exhale Worry...', duration: 4000 }
  ];

  let step = 0;

  function runBreathStep() {
    breathText.textContent = cycle[step].text;
    const currentDuration = cycle[step].duration;
    step = (step + 1) % cycle.length;
    setTimeout(runBreathStep, currentDuration);
  }

  runBreathStep();
}

/* ============================================================
   4. OPEN WHEN ACCORDIONS
============================================================ */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.accordion-item');
      const isActive = parent.classList.contains('active');

      // Close other accordions for a clean, focused reading view
      document.querySelectorAll('.accordion-item').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

/* ============================================================
   4. RANDOM SMILE / CHEER-UP GENERATOR
============================================================ */
function initSmileGenerator() {
  const smileCard = document.getElementById('smile-card');
  const nextBtn = document.getElementById('next-smile-btn');
  if (!smileCard || !nextBtn) return;

  const cheerMessages = [
    "Your smile has this magical superpower of making even my hardest days melt away into pure peace.",
    "Did you know? Thinking about your laughter is literally my favorite habit in the world.",
    "You don't need to have everything figured out today. You are doing so much better than you give yourself credit for.",
    "You have the most beautiful soul, Thachu. The kindness you carry makes the universe a gentler place.",
    "Whenever you feel small, remember: to me, you are the entire world.",
    "Take a look in the mirror today — that woman looking back is brilliant, gorgeous, and endlessly loved.",
    "A special reminder for my Thachu: You are going to get that job in Dubai soon, and everything is going to be completely okay! I believe in you with all my heart. 🇦🇪✨",
    "Whatever made you feel down today is temporary, but the love I have for you is completely eternal.",
    "I wish you could see yourself through my eyes for just ten seconds. You'd never doubt yourself again.",
    "You are my favorite notification, my favorite thought before sleeping, and my favorite reason to smile."
  ];

  let lastIndex = 0;

  nextBtn.addEventListener('click', () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cheerMessages.length);
    } while (newIndex === lastIndex && cheerMessages.length > 1);

    lastIndex = newIndex;

    smileCard.style.opacity = '0';
    smileCard.style.transform = 'translateY(8px)';

    setTimeout(() => {
      smileCard.textContent = `"${cheerMessages[newIndex]}"`;
      smileCard.style.transition = 'all 0.3s ease';
      smileCard.style.opacity = '1';
      smileCard.style.transform = 'translateY(0)';
    }, 200);
  });
}

/* ============================================================
   7. SINCERE APOLOGY & FORGIVENESS TOKEN
============================================================ */
function initForgivenessAction() {
  const forgiveBtn = document.getElementById('forgive-btn');
  const statusDiv = document.getElementById('forgiveness-status');
  if (!forgiveBtn || !statusDiv) return;

  let forgiven = false;

  forgiveBtn.addEventListener('click', () => {
    if (!forgiven) {
      forgiven = true;
      statusDiv.innerHTML = `
        <span style="color: #8f5813; font-weight: 600;">
          🕊️ "Thank you for the grace of your forgiveness, my Thachu. I cherish your heart with all my soul and promise to keep protecting it with tenderness and love."
        </span>
      `;

      if (window.confetti) {
        // Multi-directional gentle golden and rose petal confetti
        window.confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#c69248', '#d64562', '#f7edd8']
        });
        window.confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c69248', '#d64562', '#f7edd8']
        });
      }

      forgiveBtn.innerHTML = `<span>❤️ Heart Forgiven & Reunited</span>`;
      forgiveBtn.style.background = '#6a3a09';
      forgiveBtn.disabled = true;
      forgiveBtn.style.cursor = 'default';
    }
  });
}

/* ============================================================
   8. LITTLE LOVE JAR
============================================================ */
function initLoveJar() {
  const jarTrigger = document.getElementById('love-jar-trigger');
  const noteCard = document.getElementById('note-card');
  const noteText = document.getElementById('note-text');
  if (!jarTrigger || !noteCard || !noteText) return;

  const jarNotes = [
    "You are the most precious person in my world. Just knowing you exist and that I get to love you makes every day worthwhile.",
    "No matter what mistakes I make or how imperfect I am, my heart is completely devoted to learning and loving you better.",
    "If I had to live my life all over again, my only condition would be finding you a little sooner so I could love you even longer.",
    "You make ordinary moments feel like poetry. Just hearing you breathe or talk about your day is my greatest comfort.",
    "My hands fit best when holding yours. Always remember you have a permanent home in my heart.",
    "I promise to always be your number one fan, your midnight listener, and your biggest protector.",
    "Don't worry about what lies ahead, my love. You will get that job in Dubai soon, everything will fall into place, and all will be okay. I'm right here with you.",
    "I am willing to do anything for you, Thachu — cross oceans for you, and my dua's will hug you and keep you safe until the day I can hold you in a halal way.",
    "You are not just my love; you are my peace, my home, and my favorite adventure, Thachu."
  ];

  let currentNoteIdx = 0;

  jarTrigger.addEventListener('click', () => {
    currentNoteIdx = (currentNoteIdx + 1) % jarNotes.length;

    noteCard.style.transform = 'scale(0.95)';
    noteCard.style.opacity = '0';

    setTimeout(() => {
      noteText.textContent = `"${jarNotes[currentNoteIdx]}"`;
      noteCard.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      noteCard.style.transform = 'scale(1)';
      noteCard.style.opacity = '1';
    }, 200);

    if (window.confetti) {
      window.confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#d64562', '#fbe5ea', '#c69248']
      });
    }
  });
}

/* ============================================================
   9. FAV SNAPS LIGHTBOX
============================================================ */
function initSnapsLightbox() {
  const lightbox = document.getElementById('snap-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.querySelector('.lightbox-backdrop');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.snap-card').forEach((card) => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const caption = card.getAttribute('data-caption');
      lightboxImg.src = fullSrc;
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
