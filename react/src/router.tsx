import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import SubmissionInput from "@/components/type_submissions/SubmissionInput.tsx";
import ChallengesList from "@/components/browse/ChallengesList.tsx";
import CategoriesList from "@/components/browse/CategoriesList.tsx";
import BrowseContainer from "@/components/browse/BrowseContainer.tsx";
import Challenge from "@/components/type_window/Challenge.tsx";


const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/challenge/:id',
                element: <Challenge />
            },
            {
                path: '/submit',
                element: <SubmissionInput />
            },
            {
                path: '/browse',
                element: <BrowseContainer />,
                children: [
                    {
                        path: '',
                        element: <CategoriesList />
                    },
                    {
                        path: ':category',
                        element: <ChallengesList />
                    }
                ]
            },


        ]
    },

])

export default router;