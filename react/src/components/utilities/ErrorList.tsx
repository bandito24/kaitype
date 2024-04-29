export default function ErrorList({errors}) {
  let errorList: Array<string> | string

  if (Array.isArray(errors)) {
    errorList = errors
  } else if (typeof errors === 'object') {
    errorList = Object.values(errors)
  } else {
    errorList = [errors]
  }
  return (
    <>
      {errorList.map((error, index) => (
        <div key={index}>
          <p style={{color: '#cc0000'}}>{error}</p>
        </div>
      ))}
    </>
  )
}
