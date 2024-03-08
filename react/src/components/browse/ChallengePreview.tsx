type Props = {
    challengeContent: string[];
}

export default function ChallengePreview({challengeContent}: Props) {
    return (
        <div className="absolute right-0 bottom-0 max-h-48 w-3/4 overflow-scroll bg-amber-100 z-10 p-10 rounded">
            <pre className="whitespace-pre-wrap">
            {challengeContent.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
            </pre>
        </div>
    )
}