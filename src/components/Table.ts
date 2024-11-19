import { TestData } from '../data/TestData';
import { Test } from '../types/types';

export class Table {
  private tableElement: HTMLTableElement;
  private tableBody: HTMLTableSectionElement;

  constructor(private testData: TestData) {
    const data = testData.getCurrentData();
    this.tableElement = document.createElement('table');
    this.tableElement.className = 'table';

    const tableHeader = this.tableElement.createTHead();
    const headerRow = tableHeader.insertRow();
    headerRow.className = 'table__header-row';

    Object.keys(data[0]).forEach((key) => {
      if (key !== 'result_id') {
        const headerCell = document.createElement('th');
        headerCell.className = 'table__header-cell';
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      }
    });

    this.tableBody = this.tableElement.createTBody();
    data.forEach((row, index) => {
      const dataRow = this.tableBody.insertRow();
      dataRow.className = 'table__test-row';

      Object.entries(row).forEach(([key, value]) => {
        if (key !== 'result_id') {
          const dataCell = document.createElement('td');
          dataCell.classList.add('table__test-cell', 'table__test-cell--' + key);
          if (key === 'test_name') {
            const test_url = `http://monik.hh.nexinsure.org:8080/test-context-view?customer=${row.customer}&branch=${row.branch}&resultId=${row.result_id}`;
            dataCell.onclick = () => window.open(test_url);
            dataCell.textContent = String(value);
            dataCell.classList.add('link-cell');
          } else if (key === 'ticket_id') {
            this.creatInputId(dataCell, value, index);
            this.createEditButton(dataCell, row, index);
          } else {
            dataCell.textContent = String(value);
          }
          dataRow.appendChild(dataCell);
        }
      });
    });
  }

  private createEditButton(buttonCell: HTMLTableCellElement, row: Test, index: number): void {
    const editButton = document.createElement('button');
    editButton.classList.add('table__test-cell__edit-button');
    const editButtonSpan = document.createElement('span');
    editButtonSpan.textContent = 'edit';
    editButtonSpan.classList.add('table__test-cell__edit-icon', 'material-symbols-outlined');
    editButton.appendChild(editButtonSpan);

    if (row['ticket_id'] === '') {
      editButton.classList.add('save');
    } else {
      editButton.classList.add('edit');
    }
    editButton.addEventListener('click', () => {
      const row = editButton.closest('tr');
      const idField = row?.querySelector('.table__test-cell__id-field') as HTMLInputElement;
      const idCell = row?.querySelector('.table__test-cell--ticket_id');
      const textContent = idCell?.querySelector('.table__test-cell__text-content') as HTMLElement;
      if (editButton.classList.contains('save') && idField.value !== '') {
        if (idField && textContent) {
          textContent.textContent = idField.value;
          idField.style.display = 'none';
          textContent.style.display = '';
          this.testData.updateTicketID(index, idField.value);
        }

        editButton.classList.remove('save');
        editButton.classList.add('edit');
      } else if (editButton.classList.contains('edit')) {
        if (idField && textContent) {
          idField.style.display = '';
          textContent.style.display = 'none';
        }

        editButton.classList.remove('edit');
        editButton.classList.add('save');
      }
    });

    buttonCell.appendChild(editButton);
  }

  private creatInputId(dataCell: HTMLTableCellElement, value: unknown, index: number): void {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter TicketID';
    inputField.className = 'table__test-cell__id-field';
    inputField.value = String(value);
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.handleEnterPress(inputField, index);
      }
    });
    dataCell.appendChild(inputField);

    const textNode = document.createElement('span');
    textNode.className = 'table__test-cell__text-content';
    textNode.textContent = String(value);
    dataCell.appendChild(textNode);

    if (String(value) === '') {
      inputField.style.display = '';
      textNode.style.display = 'none';
    } else {
      inputField.style.display = 'none';
      textNode.style.display = '';
    }
  }

  private handleEnterPress(idField: HTMLInputElement, index: number): void {
    const row = idField.closest('tr');
    const idCell = row?.querySelector('.table__test-cell--ticket_id');
    const textContent = idCell?.querySelector('.table__test-cell__text-content') as HTMLElement;
    const editButton = row?.querySelector('.table__test-cell__edit-button') as HTMLButtonElement;
    if (idField.value !== '') {
      if (idCell && textContent) {
        textContent.textContent = idField.value;
        idField.style.display = 'none';
        textContent.style.display = '';
        this.testData.updateTicketID(index, idField.value);
      }
      if (editButton) {
        editButton.classList.remove('save');
        editButton.classList.add('edit');
      }
    }
  }

  public render(container: HTMLElement): void {
    container.appendChild(this.tableElement);
  }
}
