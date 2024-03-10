import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "@/services/axios-client.tsx";
import TypeWindow from "@/components/type_window/TypeWindow.tsx";

type ChallengeMetadata = {
    title: string,
    description: string,
    content: string, //json
    id: number,
}

export default function Challenge() {
    const [challengeMetadata, setChallengeMetadata] = useState<null | ChallengeMetadata>()
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const challengeResponse = await axiosClient.get(`/submission/${id}`)
                setChallengeMetadata(challengeResponse.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

    }, []);

    return (
        <>
            {
                challengeMetadata &&
                <TypeWindow
                    // jsonChallengeContent={challengeMetadata.content}
                    challengeMetadata={challengeMetadata}
                />
            }
        </>
    )
}