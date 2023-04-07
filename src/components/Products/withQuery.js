/* eslint-disable func-names */
/* eslint-disable max-len */
import Loader from '../Loader/Loader'

const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isLoading === true) return <Loader />
  if (isError === true) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p>
          Произошла ошибка:

          {error.massage}
        </p>
        <button type="button" className="btn btn-primary mx-4" onClick={refetch}>Повторить еще раз</button>
      </div>
    )
  }

  return <WrappedComponent {...rest} />
}

export default withQuery
