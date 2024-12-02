import { TestData } from '../../data/TestData';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export class Table {
  constructor(testData: TestData) {
    new TableHead(testData);
    new TableBody(testData);
  }
}
