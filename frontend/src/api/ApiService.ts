import { ApiTest, Test } from '../types/types';

export class ApiService {
  private apiUrl: string;
  constructor() {
    //hoping this is fine
    //this.apiUrl = process.env.API_URL || 'http://localhost:8080';
    this.apiUrl = 'http://localhost:8080';
  }

  async getTests(): Promise<Test[]> {
    try {
      const response = await fetch(`${this.apiUrl}/json/tests`);
      if (!response.ok) {
        throw new Error('failed to fetch from api: ' + response.statusText);
      }

      const data = await response.json();
      if (data && Array.isArray(data.tests)) {
        const mappedData: Test[] = data.tests.map((item: ApiTest) => ({
          case_id: item.case_id,
          test_name: item.test_name,
          customer: item.customer,
          branch: item.branch,
          test_status: item.test_status,
          ticket_status: item.ticket_status !== undefined ? item.ticket_status : '',
          ticket_id: item.ticket_id !== undefined ? item.ticket_id : '',
          result_id: item.result_id,
        }));
        return mappedData;
      } else {
        throw new Error('Response does not contain valid "tests" array');
      }
    } catch (error) {
      console.error('failed to fetch from api: ' + error);
      throw new Error('failed to fetch from api');
    }
  }

  async putTests(changedData: unknown): Promise<unknown> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changedData),
      });
      if (!response.ok) {
        throw new Error('HTTP error! Status: ' + response.status);
      }
      const responseData = await response.json();
      console.log('Response:', responseData);
      return responseData;
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}
