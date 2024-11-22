import { ControlPanel } from './components/ControlPanel';
import { Table } from './components/Table';
import { Dialog } from './components/Dialog';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TestData } from './data/TestData';
import { ApiService } from './api/ApiService';
import { Test } from './types/types';
import './styles/main.css';

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
    this.initialize();
  }
  private async initialize() {
    const apiService = new ApiService();
    try {
      const response: Test[] = await apiService.getTests();
      this.testData = new TestData(response);
      this.renderApp(this.testData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async refresh() {
    const tableContainer = document.querySelector('.table-container') as HTMLElement;
    if (tableContainer) {
      tableContainer.innerHTML = '';
      const dataTable = new Table(this.testData);
      dataTable.render(tableContainer);
    }
  }

  private renderApp(testData: TestData): void {
    document.title = 'KTestTicketUpdater';
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    const headerContainer = document.createElement('div');
    const header = new Header();
    header.render(headerContainer);
    mainContainer.appendChild(headerContainer);

    const content = document.createElement('div');
    content.className = 'content';

    const controlPanel = new ControlPanel(testData);
    controlPanel.render(content);

    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';
    const dialog = new Dialog(testData);
    dialog.render(dialogContainer);
    content.appendChild(dialogContainer);

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    const dataTable = new Table(testData);
    dataTable.render(tableContainer);
    content.appendChild(tableContainer);

    mainContainer.appendChild(content);

    const footerContainer = document.createElement('div');
    const footer = new Footer();
    footer.render(footerContainer);
    mainContainer.appendChild(footerContainer);

    document.body.appendChild(mainContainer);
  }
}
