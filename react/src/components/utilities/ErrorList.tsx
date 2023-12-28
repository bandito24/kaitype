export default function ErrorList({errors}) {
    const errorList: Array<string> = Object.values(errors);
    return (
        <>
            {errorList.map((error, index) => (
                <div key={index} >
                    <p style={{color: '#cc0000'}}>{error}</p>
                </div>
            ))}
        </>
    )
}