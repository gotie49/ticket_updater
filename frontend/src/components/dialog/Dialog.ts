import { TestData } from '../../data/TestData';
import { App } from '../../App';

export class Dialog {
  constructor(testData: TestData) {
    this.addEventListeners(testData);
  }

  private addEventListeners(testData: TestData): void {
    const closeButton = document.querySelector('.dialog-content__close-button') as HTMLButtonElement;
    const updateButton = document.querySelector('.dialog-content__update-button') as HTMLButtonElement;
    const dialogParagraph = document.querySelector('.dialog-content__paragraph') as HTMLParagraphElement;

    if (closeButton) closeButton.addEventListener('click', () => this.handleClose());
    if (updateButton && dialogParagraph) {
      updateButton.addEventListener('click', () => this.handleUpdate(dialogParagraph, updateButton, testData));
    }
  }

  private handleClose(): void {
    const dialogContainer = document.querySelector('.dialog-container') as HTMLDivElement;
    if (dialogContainer) {
      dialogContainer.style.display = 'none';
    }
  }

  private async handleUpdate(
    dialogParagraph: HTMLParagraphElement,
    updateButton: HTMLButtonElement,
    testData: TestData
  ): Promise<void> {
    if (testData.isDataChanged()) {
      const spinner = document.querySelector('.spinner-container') as HTMLDivElement;
      spinner.style.display = 'initial';

      try {
        testData.syncWithAPI();
        await testData.resetData();
        App.getApp().refresh();
        spinner.style.display = 'none';
      } catch (error) {
        console.error('Error:', error);
      }

      updateButton.style.display = 'none';
      dialogParagraph.textContent = 'Maybe we have updated the database ok';
    } else {
      console.error('Data not changed');
    }
  }
}
