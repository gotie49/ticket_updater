import { App } from '../../App';
import { TestData } from '../../data/TestData';
import { Test } from '../../types/types';

export class TableHead {
  constructor(testData: TestData) {
    this.addHeaderListeners(testData);
  }

  private addHeaderListeners(testData: TestData): void {
    const spinner = document.querySelector('.spinner-container') as HTMLDivElement;
    const data = testData.getCurrentData();

    Object.keys(data[0]).forEach((key) => {
      const headerCell = document.querySelector('.' + key) as HTMLTableCellElement;

      if (key !== 'result_id' && key !== 'case_id' && key !== 'last_new_failed') {
        headerCell.addEventListener('click', () => {
          spinner.style.display = 'initial';
          //re-initialize data because refresh
          const data = testData.getCurrentData();

          const isAscending = headerCell.classList.contains('ascending');

          data.sort((a, b) => {
            const valueA = a[key as keyof Test] as string;
            const valueB = b[key as keyof Test] as string;

            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
            return 0;
          });

          headerCell.classList.toggle('ascending', !isAscending);
          headerCell.classList.toggle('descending', isAscending);

          App.getApp().refresh();
          spinner.style.display = 'none';
        });
      } else if (key === 'last_new_failed') {
        headerCell.addEventListener('click', () => {
          spinner.style.display = 'initial';
          const data = testData.getCurrentData();

          if (headerCell.classList.contains('ascending')) {
            data.sort((a: Test, b: Test) => {
              const timeA = a.last_new_failed === 'n/a' ? 0 : new Date(a.last_new_failed + 'T00:00:00').getTime();
              const timeB = b.last_new_failed === 'n/a' ? 0 : new Date(b.last_new_failed + 'T00:00:00').getTime();

              return timeB - timeA; // Descending
            });
            headerCell.classList.remove('ascending');
            headerCell.classList.add('descending');
          } else if (headerCell.classList.contains('descending')) {
            data.sort((a: Test, b: Test) => {
              const timeA = a.last_new_failed === 'n/a' ? 0 : new Date(a.last_new_failed + 'T00:00:00').getTime();
              const timeB = b.last_new_failed === 'n/a' ? 0 : new Date(b.last_new_failed + 'T00:00:00').getTime();

              return timeA - timeB; // Ascending
            });
            headerCell.classList.remove('descending');
            headerCell.classList.add('ascending');
          }

          App.getApp().refresh();
          spinner.style.display = 'none';
        });
      }
    });
  }
}
