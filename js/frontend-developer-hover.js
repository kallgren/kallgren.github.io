/**
 * Frontend Developer hover effect - toggles code variant on hover
 */

import { config } from "./config.js";

const NORMAL_TEXT = "Frontend Developer";
const CODE_TEXT = "<FrontendDeveloper />";

/**
 * Initialize the hover effect
 */
export function initFrontendDeveloperHover() {
  if (!config.features.frontendDeveloperHover) return;

  const intro = document.querySelector(".intro");
  const role = document.getElementById("role");

  intro.addEventListener("mouseenter", () => {
    role.textContent = CODE_TEXT;
    role.classList.add("code");
  });

  intro.addEventListener("mouseleave", () => {
    role.textContent = NORMAL_TEXT;
    role.classList.remove("code");
  });
}
