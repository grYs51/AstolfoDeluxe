import { useEffect, useState } from "react";
import { getGuildMembers } from "../../api";
import { MemberInfo } from "../../types";

export function useFetchGuildMembers(guildId: string) {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useEffect(() => {
    getGuildMembers(guildId).then(({ data }) => {
      setMembers(data);
    });
  }, []);

  return { members };
}
