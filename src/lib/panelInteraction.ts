import type { KeyboardEvent, MouseEvent } from "react";

export function isFromInteractiveChild<T extends HTMLElement>(
  event: MouseEvent<T> | KeyboardEvent<T>,
) {
  const target = event.target;

  return (
    target instanceof Element &&
    target !== event.currentTarget &&
    Boolean(target.closest("a, button, input, textarea, select"))
  );
}

export function handlePanelKey<T extends HTMLElement>(
  event: KeyboardEvent<T>,
  onActivate: () => void,
) {
  if (isFromInteractiveChild(event)) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onActivate();
  }
}
