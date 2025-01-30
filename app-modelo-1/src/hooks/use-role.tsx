import { Role } from "@prisma/client"
import { withRole } from "@/lib/withRole"
import { useEffect, useState } from "react"

export const useRole = (requiredRole: Role[]) => {
  const [allowed, setAllowed] = useState<boolean>(false)

  useEffect(() => {
    const checkRole = async () => {
      const isAllowed = await withRole(requiredRole)
      setAllowed(isAllowed)
    }

    checkRole()
  }, [requiredRole])

  return { allowed, deny: !allowed }
}