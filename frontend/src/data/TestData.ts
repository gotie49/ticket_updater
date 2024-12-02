import { ApiService } from '../api/ApiService';
import { Test } from '../types/types';

export class TestData {
  private originalData: Test[];
  private currentData: Test[];
  private changedData: Test[];
  private isChanged: boolean;
  private apiService: ApiService;

  constructor(data: Test[]) {
    this.originalData = [...data];
    this.currentData = [...data];
    this.changedData = [];
    this.isChanged = false;
    this.apiService = new ApiService();
  }

  public updateTicketID(rowIndex: number, value: string): void {
    const columnName = 'ticket_id';
    this.currentData[rowIndex][columnName] = value;
    this.changedData.push(this.currentData[rowIndex]);
    this.isChanged = true;
  }

  public reset(): void {
    this.currentData = [...this.originalData];
    this.isChanged = false;
  }

  public getCurrentData(): Test[] {
    return this.currentData;
  }

  public getChangedData(): Test[] {
    return this.changedData;
  }

  public isDataChanged(): boolean {
    return this.isChanged;
  }

  public async resetData(): Promise<void> {
    try {
      const response: Test[] = await this.apiService.getTests();
      this.currentData = response;
      this.originalData = response;
      this.changedData = [];
      this.isChanged = false;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async syncWithAPI(): Promise<void> {
    const apiData = this.changedData.map(({ ticket_id, case_id }) => ({ ticket_id, case_id }));
    console.log(JSON.stringify(apiData));
    //this.apiService.putTests(apiData);
  }
}
