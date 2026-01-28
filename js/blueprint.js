/**
 * Blueprint grid effect - reveals grid pattern around elements based on cursor proximity
 */

import { config } from "./config.js";

const { maxDistance, padding, maskSizes } = config.blueprint;

let elements = null;
let gridOverlay = null;

/**
 * Calculate distance from mouse to rectangular element edge (0 if inside)
 */
function getEdgeDistance(mouseX, mouseY, rect) {
  const dx = Math.max(
    0,
    Math.abs(mouseX - (rect.left + rect.width / 2)) - rect.width / 2 - padding,
  );
  const dy = Math.max(
    0,
    Math.abs(mouseY - (rect.top + rect.height / 2)) - rect.height / 2 - padding,
  );
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate distance from mouse to circular element edge (0 if inside)
 */
function getCircleEdgeDistance(mouseX, mouseY, rect) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const radius = rect.width / 2 + padding;
  const dist = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
  return Math.max(0, dist - radius);
}

/**
 * Convert distance to opacity (1 when close, 0 when far)
 */
function distanceToOpacity(distance) {
  return Math.max(0, 1 - distance / maxDistance);
}

/**
 * Update CSS variables for element mask positions and sizes
 */
export function updateElementPositions() {
  if (!elements || !gridOverlay) return;

  const nameRect = elements.name.getBoundingClientRect();
  const taglineRect = elements.tagline.getBoundingClientRect();
  const profileRect = elements.profile.getBoundingClientRect();

  // Name
  gridOverlay.style.setProperty(
    "--name-x",
    nameRect.left + nameRect.width / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--name-y",
    nameRect.top + nameRect.height / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--name-size",
    nameRect.width * maskSizes.name + "px",
  );

  // Tagline
  gridOverlay.style.setProperty(
    "--tagline-x",
    taglineRect.left + taglineRect.width / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--tagline-y",
    taglineRect.top + taglineRect.height / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--tagline-size",
    taglineRect.width * maskSizes.tagline + "px",
  );

  // Profile
  gridOverlay.style.setProperty(
    "--profile-x",
    profileRect.left + profileRect.width / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--profile-y",
    profileRect.top + profileRect.height / 2 + "px",
  );
  gridOverlay.style.setProperty(
    "--profile-size",
    profileRect.width * maskSizes.profile + "px",
  );
}

/**
 * Handle mouse movement - update opacities based on cursor proximity
 */
function handleMouseMove(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const nameRect = elements.name.getBoundingClientRect();
  const taglineRect = elements.tagline.getBoundingClientRect();
  const profileRect = elements.profile.getBoundingClientRect();

  // Calculate distances and opacities
  const nameOpacity = distanceToOpacity(
    getEdgeDistance(mouseX, mouseY, nameRect),
  );
  const taglineOpacity = distanceToOpacity(
    getEdgeDistance(mouseX, mouseY, taglineRect),
  );
  const profileOpacity = distanceToOpacity(
    getCircleEdgeDistance(mouseX, mouseY, profileRect),
  );

  // Update element mask opacities
  gridOverlay.style.setProperty("--name-opacity", nameOpacity);
  gridOverlay.style.setProperty("--tagline-opacity", taglineOpacity);
  gridOverlay.style.setProperty("--profile-opacity", profileOpacity);

  // Cursor spotlight - amplifies where masks overlap
  const maxOpacity = Math.max(nameOpacity, taglineOpacity, profileOpacity);
  gridOverlay.style.setProperty("--cursor-x", mouseX + "px");
  gridOverlay.style.setProperty("--cursor-y", mouseY + "px");
  gridOverlay.style.setProperty("--cursor-opacity", maxOpacity);

  // Individual blueprint opacities for CSS (outl    // Overall blueprint opacity for CSS (outlines, tags, specs)
  document.body.style.setProperty("--blueprint-opacity", maxOpacity);
}

/**
 * Initialize blueprint effect
 */
export function initBlueprint(elementRefs) {
  elements = elementRefs;
  gridOverlay = document.getElementById("gridOverlay");

  if (!config.features.blueprint) {
    gridOverlay.style.display = "none";
    return;
  }

  updateElementPositions();
  window.addEventListener("resize", updateElementPositions);
  document.addEventListener("mousemove", handleMouseMove);
}
