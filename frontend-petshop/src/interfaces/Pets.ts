import Client from "./Client";

export default interface Pets {
  id: number;
  name: string;
  type: string;
  breed: string;
  months: number;
  sex: "FEMALE" | "MALE";
  weight: number;
  client: Client;
}
