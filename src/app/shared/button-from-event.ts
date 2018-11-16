export function getButtonFromEvent(e: Event): HTMLButtonElement {
  const element = e.target as HTMLElement;
  return getButtonFromElement(element);
}

export function getButtonFromElement(el: HTMLElement): HTMLButtonElement {
  if (el.tagName === 'BUTTON') {
    return el as HTMLButtonElement;
  }
  return el.parentElement ? getButtonFromElement(el.parentElement) : null;
}
