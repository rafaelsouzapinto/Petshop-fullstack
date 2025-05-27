import Pet from "./Pets";
import Service from "./Service";

export default interface Registration {
  id: number;
  finalPrice: number;
  moment: string;
  description: string;
  serviceStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  pet: Pet;
  service: Service;
}
