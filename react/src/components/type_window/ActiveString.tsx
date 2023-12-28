
type ActiveStringProps = {
    progressString: string
}

export default function ActiveString({progressString}: ActiveStringProps) {

    return (
        <>
            <h2 className="text-center text-2xl" dangerouslySetInnerHTML={{ __html: progressString }}></h2>
        </>
    )
}