import Modal from '../Modal/Modal'

/* eslint-disable react/function-component-definition */
const SuccessModal = ({
  setIsSuccessModalOpen, isOpen, action,
}) => {
  const closeSuccessModalHandler = () => {
    setIsSuccessModalOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeSuccessModalHandler}>
      <b>
        {`Вы успешно ${action} товар!`}
      </b>
    </Modal>
  )
}

export default SuccessModal
