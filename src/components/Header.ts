export class Header {
  private header: HTMLDivElement;
  constructor() {
    this.header = document.createElement('div');
    this.header.className = 'header'; //change this lol

    const leftText = document.createElement('div');
    leftText.className = 'header__left-text';

    const redspan = document.createElement('span');
    redspan.className = 'red';
    redspan.textContent = 'KTestTicketUpdater';
    leftText.appendChild(redspan);

    const leftTextContent = document.createTextNode(' - some more cool text');
    leftText.appendChild(leftTextContent);

    this.header.appendChild(leftText);

    const rightText = document.createElement('div');
    rightText.className = 'header__right-text';
    rightText.textContent = 'Some cool text';

    this.header.appendChild(rightText);
  }

  render(container: HTMLElement) {
    container.appendChild(this.header);
  }
}
