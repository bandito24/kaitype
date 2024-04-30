import {Outlet} from "react-router-dom";

export default function BrowseContainer() {

    return (
        <div>
            <section className="text-gray-600 body-font mt-20 animate-fadeIn">

                <Outlet />

            </section>
        </div>
    )
}