import { TestData } from '../data/TestData';
import { FilterTable } from '../utils/FilterTable';

export class ControlPanel {
  private filteringOptions: HTMLDivElement;
  private controlPanel: HTMLDivElement;
  private filterTable: FilterTable;
  private isChecked: boolean;

  constructor(testData: TestData) {
    this.isChecked = false;
    this.filterTable = new FilterTable();

    this.controlPanel = document.createElement('div');
    this.controlPanel.className = 'control-panel';

    this.filteringOptions = document.createElement('div');
    this.filteringOptions.className = 'control-panel__filtering-options';

    this.filteringOptions.appendChild(this.createInputFilter('customer'));
    this.filteringOptions.appendChild(this.createInputFilter('branch'));
    this.filteringOptions.appendChild(this.createInputFilter('test_name'));
    this.filteringOptions.appendChild(this.createInputFilter('case_id'));
    this.filteringOptions.appendChild(this.createInputFilter('ticket_id'));

    this.filteringOptions.appendChild(this.createCheckBox());

    this.filteringOptions.appendChild(this.createUpdateButton(testData));

    this.controlPanel.appendChild(this.filteringOptions);

    this.controlPanel.appendChild(this.createResetButton());
  }

  private createInputFilter(inputName: string): HTMLDivElement {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('control-panel__filter-container', 'control-panel__filter-container--' + inputName);

    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'Filter by ' + inputName;
    filterLabel.htmlFor = inputName;
    filterLabel.className = 'control-panel__label';

    const searchContainer = document.createElement('div');
    searchContainer.className = 'control-panel__search-container';

    const filterSpan = document.createElement('label');
    filterSpan.classList.add('material-symbols-outlined', 'control-panel__search-icon');
    filterSpan.textContent = 'search';
    filterSpan.htmlFor = inputName;
    searchContainer.appendChild(filterSpan);

    const inputField = document.createElement('input');
    inputField.placeholder = inputName;
    inputField.name = inputName;
    inputField.id = inputName;
    inputField.type = 'text';
    inputField.className = 'control-panel__search-input';
    inputField.addEventListener('input', () => {
      console.log('hello this is ' + inputField.value);
      this.filterTable.filterTable(this.isChecked, inputName, inputField.value);
    });
    searchContainer.appendChild(filterSpan);
    searchContainer.appendChild(inputField);

    filterContainer.appendChild(filterLabel);
    filterContainer.appendChild(searchContainer);

    return filterContainer;
  }

  private createCheckBox(): HTMLLabelElement {
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.className = 'control-panel__checkbox-label';
    const checkBox = document.createElement('input');
    checkBox.className = 'control-panel__checkbox';
    checkBox.type = 'checkbox';
    checkBox.name = 'noTicketOnly';
    checkBox.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.isChecked = target.checked;
      console.log('Checkbox is ' + this.isChecked);
      this.filterTable.filterTable(this.isChecked, 'ticket_id', '');
    });
    checkBoxLabel.appendChild(checkBox);
    const checkBoxLabelText = document.createTextNode('Only show rows without tickets');
    checkBoxLabel.appendChild(checkBoxLabelText);
    return checkBoxLabel;
  }

  private createUpdateButton(testData: TestData): HTMLDivElement {
    const updateButtonContainer = document.createElement('div');
    updateButtonContainer.className = 'control-panel__update-button-container';
    const updateButton = document.createElement('button');
    updateButton.className = 'control-panel__update-button';
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
      console.log('click,update,click');
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

    updateButtonContainer.appendChild(updateButton);
    return updateButtonContainer;
  }

  private createResetButton(): HTMLDivElement {
    const resetButtonContainer = document.createElement('div');
    resetButtonContainer.className = 'control-panel__reset-button-container';
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.className = 'control-panel__reset-button';
    resetButton.addEventListener('click', () => {
      console.log('click,reset,click');
      const inputFilters = document.querySelectorAll<HTMLInputElement>('.control-panel__search-input');
      inputFilters.forEach((inputField) => {
        inputField.value = '';
        this.filterTable.resetFilter();
      });
      const checkBox = document.querySelector('.control-panel__checkbox') as HTMLInputElement;
      checkBox.checked = false;
      this.isChecked = false;
    });
    resetButtonContainer.appendChild(resetButton);
    return resetButtonContainer;
  }

  public render(container: HTMLElement): void {
    container.appendChild(this.controlPanel);
  }
}
