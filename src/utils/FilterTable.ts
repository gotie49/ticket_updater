import { Filter } from '../types/types';
export class FilterTable {
  private filter: Filter = {
    customer: '',
    branch: '',
    test_name: '',
    case_id: '',
    ticket_id: '',
  };

  public resetFilter() {
    this.filter = { customer: '', branch: '', test_name: '', case_id: '', ticket_id: '' };
    const rows = document.querySelectorAll('.table__test-row');
    for (let i = 0; i < rows?.length; i++) {
      const row = rows[i] as HTMLTableRowElement;
      row.style.display = '';
    }
  }
  public filterTable(isChecked: boolean, inputName: string, value: string) {
    this.filter[inputName as keyof Filter] = value;

    const rows = document.querySelectorAll('.table__test-row');
    const header = document.querySelectorAll('.table__header-cell');
    const headerMap: { [key: string]: number } = {};

    header.forEach((th, index) => {
      const headerText = th.textContent?.toLowerCase().trim() || '';
      headerMap[headerText] = index;
    });

    const ticketIdIndex = headerMap['ticket_id'.toLowerCase()];
    if (ticketIdIndex === undefined) return;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as HTMLTableRowElement;
      const cells = row.querySelectorAll('.table__test-cell');

      let hideThis = false;

      for (const [key, value] of Object.entries(this.filter)) {
        const lowerKey = key.toLowerCase();
        const columnIndex = headerMap[lowerKey];

        if (columnIndex === undefined) continue;

        const cellValue = cells[columnIndex]?.textContent?.trim() || '';

        if (columnIndex !== ticketIdIndex) {
          if (!cellValue.toLowerCase().includes(value.toString().toLowerCase())) {
            hideThis = true;
          }
        } else {
          let value = cellValue;
          if (cellValue.endsWith('edit')) {
            value = cellValue.slice(0, -'edit'.length).trimEnd();
          }
          if (value !== '' && isChecked) {
            hideThis = true;
          }
        }
      }
      row.style.display = hideThis ? 'none' : '';
    }
  }
}
