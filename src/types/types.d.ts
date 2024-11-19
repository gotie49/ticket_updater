interface Test {
  case_id: number;
  test_name: string;
  customer: string;
  branch: string;
  test_status: string;
  ticket_status: string;
  ticket_id: string;
  result_id: number;
}
interface ApiTest {
  ticket_status: string;
  test_status: string;
  result_id: number;
  case_id: number;
  tech_component: string;
  ticket_id: string;
  test_name: string;
  branch: string;
  customer: string;
}
interface Filter {
  customer: string;
  branch: string;
  test_name: string;
  case_id: string;
  ticket_id: string;
}
export { Test, ApiTest, Filter };
