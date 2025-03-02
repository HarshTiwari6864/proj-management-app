import { PermissionType } from "@/constant";
import { UserType, WorkspaceWithMembersType } from "@/types/api.type";
import { useEffect, useMemo, useState } from "react";

const usePermissions = (user: UserType | null, workspace: WorkspaceWithMembersType | null) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (!user || !workspace?.members) {
      setPermissions([]); // Reset if user or workspace is missing
      return;
    }

    const member = workspace.members.find((m) => m.userId === user._id);

    if (member?.role?.permissions) {
      setPermissions(member.role.permissions);
    } else {
      setPermissions([]); // Ensure permissions don't remain undefined
    }
  }, [user, workspace]);

  return useMemo(() => permissions ?? [], [permissions]);
};

export default usePermissions;
