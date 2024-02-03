import { TeamResource } from "../../teams/Resources/team-resource";

export interface TeamMemberResource {
  id: number;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
  description: string;
  team: TeamResource;
}
