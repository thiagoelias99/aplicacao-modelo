import { withRole } from "@/lib/withRole"
import { ERole } from "@/models/user"
import { useEffect, useState } from "react"

export const useRole = (requiredRole: ERole[]) => {
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