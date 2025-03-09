import { PermissionType } from "@/constant";
import { UserType, WorkspaceWithMembersType } from "@/types/api.type";
import { useEffect, useMemo, useState } from "react";

const usePermissions = (
  user: UserType  , // Ensure types allow null
  workspace: WorkspaceWithMembersType 
) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (user && workspace?.members) {
      const member = workspace.members.find(
        (member) => member?.userId === user?._id
      );
      
      if (member && member.role) {
        setPermissions(member.role.permissions || []);
      } else {
        console.warn("No matching member found or member role is undefined.");
        setPermissions([]); // Clear permissions in case of missing data
      }
    }
  }, [user, workspace]);

  return useMemo(() => permissions, [permissions]);
};

export default usePermissions;
