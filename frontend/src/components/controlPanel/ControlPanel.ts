import { App } from '../../App';
import { TestData } from '../../data/TestData';
import { FilterTable } from '../../utils/FilterTable';

export class ControlPanel {
  private isChecked: boolean;
  private filterTable: FilterTable;

  constructor(testData: TestData) {
    this.isChecked = false;
    this.filterTable = new FilterTable();
    this.addEventListeners(testData);
  }

  private addEventListeners(testData: TestData): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.control-panel__search-input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.filterTable.filterTable(this.isChecked, input.name, input.value);
      });
    });

    const checkbox = document.querySelector('.control-panel__checkbox') as HTMLInputElement;
    checkbox.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.isChecked = target.checked;

      this.filterTable.filterTable(this.isChecked, 'ticket_id', 'ifsomeonetypesthisbyaccidentlol');
    });

    const updateButton = document.querySelector('.control-panel__update-button') as HTMLButtonElement;
    updateButton.addEventListener('click', () => {
      const dialogContainer = document.querySelector('.dialog-container');
      const dialogParagraph = document.querySelector('.dialog-content__paragraph');
      const dialogUpdateButton = document.querySelector('.dialog-content__update-button') as HTMLButtonElement;

      if (dialogParagraph) {
        dialogParagraph.textContent = testData.isDataChanged()
          ? 'Are you sure you want to update the database?'
          : 'No changes detected.';
      }
      if (dialogUpdateButton) {
        dialogUpdateButton.style.display = testData.isDataChanged() ? '' : 'none';
      }
      if (dialogContainer instanceof HTMLDivElement) {
        dialogContainer.style.display = 'initial';
      }
    });

    const refreshButton = document.querySelector('.control-panel__refresh-button') as HTMLButtonElement;
    refreshButton.addEventListener('click', async () => {
      const spinner = document.querySelector('.spinner-container') as HTMLDivElement;
      spinner.style.display = 'initial';

      await testData.resetData();

      App.getApp().refresh();
      spinner.style.display = 'none';
    });

    const resetButton = document.querySelector('.control-panel__reset-button') as HTMLButtonElement;
    resetButton.addEventListener('click', () => {
      const inputFilters = document.querySelectorAll<HTMLInputElement>('.control-panel__search-input');

      inputFilters.forEach((inputField) => {
        inputField.value = '';
        this.filterTable.resetFilter();
      });

      const checkbox = document.querySelector('.control-panel__checkbox') as HTMLInputElement;
      checkbox.checked = false;
      this.isChecked = false;
    });
  }
}
