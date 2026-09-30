import Modal from './Modal'
import RecipeForm from './RecipeForm'

function RecipeModal({ isOpen, recipe, categories, onSave, onClose }) {
  const title = recipe ? 'Редактировать рецепт' : 'Новый рецепт'

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="modal__header">
        <div>
          <p>{recipe ? 'Изменение данных' : 'Добавление в коллекцию'}</p>
          <h2>{title}</h2>
        </div>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
      </div>
      <RecipeForm
        key={recipe?.id || 'new'}
        initialRecipe={recipe}
        categories={categories}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default RecipeModal
