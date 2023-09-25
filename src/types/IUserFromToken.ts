export interface UserFromToken {
  id: string;
  name: string;
  type: "candidate" | "company";
}
