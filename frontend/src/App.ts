import { TestData } from './data/TestData';
import { ApiService } from './api/ApiService';
import { Test } from './types/types';
import './styles/main.css';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { Table } from './components/table/Table';
import { TableBody } from './components/table/TableBody';
import { Dialog } from './components/dialog/Dialog';

export class App {
  static app: App;
  private testData: TestData;

  public static getApp(): App {
    if (!App.app) {
      App.app = new App();
    }
    return App.app;
  }

  private constructor() {
    this.testData = new TestData([]);
    this.init();
  }

  private async init(): Promise<void> {
    const apiService = new ApiService();

    try {
      const response: Test[] = await apiService.getTests();
      this.testData = new TestData(response);
      this.addAppLogic(this.testData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private addAppLogic(testData: TestData): void {
    new ControlPanel(testData);
    new Dialog(testData);
    new Table(testData);
  }

  public async refresh(): Promise<void> {
    const tableBody = document.querySelector('.table__table-body') as HTMLTableSectionElement;
    tableBody.innerHTML = '';

    new TableBody(this.testData);
  }
}
