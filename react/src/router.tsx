import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import TypeWindow from "@/components/type_window/TypeWindow.tsx";
import SubmissionInput from "@/components/type_submissions/SubmissionInput.tsx";
import CategoriesList from "@/components/browse_categories/CategoriesList.tsx";

const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <TypeWindow />
            },
            {
                path: '/submit',
                element: <SubmissionInput />
            },
            {
                path: '/browse',
                element: <CategoriesList />
            },

        ]
    },

])

export default router;