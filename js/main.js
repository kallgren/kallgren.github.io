/**
 * Main entry point - initializes all features
 */

import { config } from "./config.js";
import { initBlueprint } from "./blueprint.js";
import { initParticles } from "./particles.js";
import { initDraggable } from "./draggable.js";
import { initFrontendDeveloperHover } from "./frontend-developer-hover.js";

/**
 * Get references to main interactive elements
 */
function getElements() {
  return {
    name: document.querySelector(".name"),
    tagline: document.querySelector(".tagline"),
    profile: document.querySelector(".profile-image"),
    socialLinks: document.querySelector(".social-links"),
  };
}

/**
 * Initialize all features
 */
function init() {
  const elements = getElements();

  // Blueprint grid effect
  initBlueprint(elements);

  // Frontend Developer hover effect
  initFrontendDeveloperHover();

  // Draggable elements
  initDraggable([elements.profile, elements.name, elements.tagline]);

  // Particle effect
  const particleDisableElements = config.features.movableElements
    ? [elements.socialLinks, elements.name, elements.tagline, elements.profile]
    : [elements.socialLinks];
  initParticles(particleDisableElements);
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
