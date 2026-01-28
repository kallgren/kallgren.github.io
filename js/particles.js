/**
 * Particle effect - spawns colorful particles that follow the cursor
 */

import { config } from "./config.js";

const {
  spawnRate,
  colors,
  maxSize,
  minSize,
  decay,
  shrinkRate,
  velocity,
  opacity,
} = config.particles;

let canvas = null;
let ctx = null;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let enabled = true;

/**
 * Resize canvas to match window dimensions
 */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Spawn new particles at current mouse position
 */
function spawnParticles() {
  for (let i = 0; i < spawnRate; i++) {
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: (Math.random() - 0.5) * velocity,
      vy: (Math.random() - 0.5) * velocity,
      life: 1,
      size: Math.random() * (maxSize - minSize) + minSize,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

/**
 * Update and render all particles
 */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= decay;
    p.size *= shrinkRate;

    if (p.life > 0) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
      return true;
    }
    return false;
  });

  requestAnimationFrame(animate);
}

/**
 * Handle mouse movement
 */
function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (enabled) {
    spawnParticles();
  }
}

/**
 * Set up hover listeners to disable particles over certain elements
 */
function setupDisableZones(elements) {
  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      enabled = false;
    });
    el.addEventListener("mouseleave", () => {
      enabled = true;
    });
  });
}

/**
 * Initialize particle effect
 */
export function initParticles(disableElements = []) {
  if (!config.features.particles) return;

  canvas = document.getElementById("particles");
  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("mousemove", handleMouseMove);

  if (disableElements.length > 0) {
    setupDisableZones(disableElements);
  }

  animate();
}
