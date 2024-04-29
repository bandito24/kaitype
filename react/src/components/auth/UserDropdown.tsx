import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu.tsx'
import axiosClient from '@/services/axios-client.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'

type SignOutResponse = {
  status: string
  message: string
}

export default function UserDropdown() {
  const {setUser, setToken} = useStateContext()
  const onSignOut = async () => {
    try {
      const axiosResponse = await axiosClient.post('/signout')
      const jsonResponse: SignOutResponse = axiosResponse.data
      setUser(null)
      setToken(null)
      console.log(jsonResponse)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="hover: cursor-pointer"
          onClick={() => onSignOut()}>
          Log Out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover: cursor-pointer">
          My Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  )
}
