import Modal from './Modal'

function ConfirmModal({ isOpen, recipe, onConfirm, onClose }) {
  return (
    <Modal isOpen={isOpen} title="Подтверждение удаления" onClose={onClose} className="modal--small">
      <div className="modal__header">
        <div>
          <p>Подтверждение</p>
          <h2>Удалить рецепт?</h2>
        </div>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
      </div>
      <p className="confirm-text">
        Удалить рецепт <strong>«{recipe?.title}»</strong>? Это действие нельзя отменить.
      </p>
      <div className="form-actions">
        <button className="button button--secondary" type="button" onClick={onClose}>
          Отмена
        </button>
        <button className="button button--danger" type="button" onClick={onConfirm}>
          Удалить
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
