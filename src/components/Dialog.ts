import { TestData } from '../data/TestData';

export class Dialog {
  private dialogContent: HTMLDivElement;
  constructor(testData: TestData) {
    this.dialogContent = document.createElement('div');
    this.dialogContent.className = 'dialog-content';
    this.dialogContent.appendChild(this.createCloseButton());

    const dialogTextContent = document.createElement('div');
    dialogTextContent.className = 'dialog-content__text';
    const dialogParagraph = document.createElement('p');
    dialogParagraph.className = 'dialog-content__paragraph';
    dialogTextContent.appendChild(dialogParagraph);
    dialogTextContent.appendChild(this.createUpdateButton(testData, dialogParagraph));
    this.dialogContent.appendChild(dialogTextContent);
  }
  private createUpdateButton(testData: TestData, dialogParagraph: HTMLParagraphElement): HTMLButtonElement {
    const updateButton = document.createElement('button');
    updateButton.className = 'dialog-content__update-button';
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
      console.log('click,update,click');
      if (testData.isDataChanged()) {
        updateButton.style.display = 'none';
        if (dialogParagraph) dialogParagraph.textContent = 'maybe we have updated the database ok';
        testData.syncWithAPI();
        testData.resetChangeState();
        //TODO: reset somethings after this(fetch updated data or something similar) isDataChanged needs to be false now
      } else {
        console.error('data not changed');
      }
    });
    return updateButton;
  }

  private createCloseButton(): HTMLDivElement {
    const closeButtonContainer = document.createElement('div');
    closeButtonContainer.className = 'close-button-container';
    const closeButton = document.createElement('button');
    closeButton.classList.add('material-symbols-outlined', 'dialog-content__close-button');
    closeButton.textContent = 'close';
    closeButton.addEventListener('click', () => {
      console.log('click,close,click');
      const dialogContainer = document.querySelector('.dialog-container');
      if (dialogContainer instanceof HTMLDivElement) {
        dialogContainer.style.display = 'none';
      }
    });
    closeButtonContainer.appendChild(closeButton);
    return closeButtonContainer;
  }
  public render(container: HTMLElement): void {
    container.appendChild(this.dialogContent);
  }
}
