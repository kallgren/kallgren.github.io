/**
 * Site configuration and feature flags
 */

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  ) || window.innerWidth <= 768;

export const config = {
  // Feature toggles (all disabled on mobile)
  features: {
    blueprint: !isMobile && true,
    frontendDeveloperHover: !isMobile && false,
    movableElements: !isMobile && true,
    particles: !isMobile && true,
  },

  // Blueprint effect settings
  blueprint: {
    maxDistance: 300, // Distance outside element where opacity reaches 0
    padding: 50, // Padding inside element edge where opacity stays at 1
    maskSizes: {
      name: 0.8, // Multiplier for name element width
      tagline: 0.7, // Multiplier for tagline element width
      profile: 1.2, // Multiplier for profile element width
    },
  },

  // Particle effect settings
  particles: {
    spawnRate: 2, // Particles spawned per mousemove
    colors: ["#3b82f6", "#e07850"],
    maxSize: 4,
    minSize: 1,
    decay: 0.02,
    shrinkRate: 0.98,
    velocity: 2,
    opacity: 0.6,
  },
};
