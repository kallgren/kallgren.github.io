/**
 * Draggable elements - allows repositioning elements by dragging
 */

import { config } from "./config.js";
import { updateElementPositions } from "./blueprint.js";

let draggedElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

/**
 * Get the hover scale from CSS variable
 */
function getHoverScale(el) {
  return (
    parseFloat(getComputedStyle(el).getPropertyValue("--hover-scale")) || 1
  );
}

/**
 * Handle mouse down - start dragging
 */
function handleMouseDown(e) {
  e.preventDefault();
  const el = e.currentTarget;

  draggedElement = el;
  draggedElement.style.cursor = "grabbing";

  const rect = el.getBoundingClientRect();

  // Convert to fixed positioning if not already
  if (el.style.position !== "fixed") {
    // Account for hover scale (transform-origin is bottom-right)
    const scale = getHoverScale(el);
    const unscaledWidth = rect.width / scale;
    const unscaledHeight = rect.height / scale;
    const offsetX = rect.width - unscaledWidth;
    const offsetY = rect.height - unscaledHeight;

    el.style.position = "fixed";
    el.style.left = rect.left + offsetX + "px";
    el.style.top = rect.top + offsetY + "px";
    el.style.margin = "0";
    el.style.zIndex = "100";
  }

  dragOffsetX = e.clientX - parseFloat(el.style.left);
  dragOffsetY = e.clientY - parseFloat(el.style.top);
}

/**
 * Handle mouse move - update position while dragging
 */
function handleMouseMove(e) {
  if (!draggedElement) return;

  draggedElement.style.left = e.clientX - dragOffsetX + "px";
  draggedElement.style.top = e.clientY - dragOffsetY + "px";

  // Keep blueprint masks in sync
  if (config.features.blueprint) {
    updateElementPositions();
  }
}

/**
 * Handle mouse up - stop dragging
 */
function handleMouseUp() {
  if (draggedElement) {
    draggedElement.style.cursor = "grab";
    draggedElement = null;
  }
}

/**
 * Initialize draggable functionality
 */
export function initDraggable(elements) {
  if (!config.features.movableElements) return;

  // Add CSS class to enable hover scale
  document.body.classList.add("movable-elements");

  // Set up each draggable element
  elements.forEach((el) => {
    el.style.cursor = "grab";
    el.addEventListener("mousedown", handleMouseDown);
  });

  // Global listeners for drag and drop
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}
