import Tooltip from './Tooltip'

function HighlightedTitle({ title, searchQuery }) {
  const query = searchQuery.trim()

  if (!query) {
    return title
  }

  const matchIndex = title.toLowerCase().indexOf(query.toLowerCase())

  if (matchIndex === -1) {
    return title
  }

  return (
    <>
      {title.slice(0, matchIndex)}
      <mark>{title.slice(matchIndex, matchIndex + query.length)}</mark>
      {title.slice(matchIndex + query.length)}
    </>
  )
}

function RecipeCard({ recipe, searchQuery, onToggleFavorite, onEdit, onDelete }) {
  return (
    <article className="recipe-card">
      <Tooltip text={recipe.tooltipText} />
      <div className="recipe-card__header">
        <h2><HighlightedTitle title={recipe.title} searchQuery={searchQuery} /></h2>
        <button
          className={`favorite-button ${recipe.isFavorite ? 'favorite-button--active' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={recipe.isFavorite}
          aria-label={recipe.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {recipe.isFavorite ? '★' : '☆'}
        </button>
      </div>
      <span className="recipe-card__category">{recipe.category}</span>
      <p>{recipe.description}</p>
      <div className="recipe-card__actions">
        <button type="button" onClick={() => onEdit(recipe)}>Редактировать</button>
        <button className="delete-button" type="button" onClick={() => onDelete(recipe)}>
          Удалить
        </button>
      </div>
    </article>
  )
}

export default RecipeCard
