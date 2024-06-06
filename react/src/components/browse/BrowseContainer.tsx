import {Outlet} from 'react-router-dom'
import {OptionsProvider} from '@/components/browse/OptionsContext.tsx'

export default function BrowseContainer() {
  return (
    <OptionsProvider>
      <div>
        <section className="body-font mt-20 animate-fadeIn text-gray-600">
          <Outlet />
        </section>
      </div>
    </OptionsProvider>
  )
}
