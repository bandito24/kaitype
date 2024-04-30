import {useStateContext} from '@/contexts/contextProvider.tsx'
import UserDropdown from '@/components/auth/UserDropdown.tsx'
import AnonymousUserDropdown from '@/components/auth/AnonymousUserDropdown.tsx'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Link} from 'react-router-dom'

export default function AccountHeader() {
  const {token, user} = useStateContext()

  return (
    <div className="flex justify-around">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded bg-black px-4 py-2 text-slate-100">
            {token && user ? 'Account' : 'Login'}
          </div>
        </DropdownMenuTrigger>
        {token && user ? <UserDropdown /> : <AnonymousUserDropdown />}
      </DropdownMenu>
      <Link to="/browse">
        <Button>Browse</Button>
      </Link>
      <Link to="/submit">
        <Button>Submit</Button>
      </Link>
    </div>
  )
}
