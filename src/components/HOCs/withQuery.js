/* eslint-disable func-names */
import Loader from '../Loader/Loader'

const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isLoading === true) return <Loader />
  if (isError === true) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p>
          Error happend:
          {' '}
          {error.message}
        </p>
        <button type="button" className="btn btn-primary mx-3" onClick={refetch}>
          Повторить
        </button>
      </div>
    )
  }

  return <WrappedComponent {...rest} />
}

export default withQuery
