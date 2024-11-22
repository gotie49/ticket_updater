export class Footer {
  private footer: HTMLDivElement;
  constructor() {
    this.footer = document.createElement('div');
    this.footer.className = 'footer';
    const footerText = document.createElement('div');
    footerText.className = 'footer__text';
    footerText.textContent = 'Some cool Text';
    this.footer.appendChild(footerText);
  }

  render(container: HTMLElement) {
    container.appendChild(this.footer);
  }
}
