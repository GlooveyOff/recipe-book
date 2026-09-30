import RecipeCard from './RecipeCard'

function RecipeList({
  recipes,
  searchQuery,
  hasFilters,
  onToggleFavorite,
  onEdit,
  onDelete,
}) {
  if (recipes.length === 0) {
    return (
      <p className="empty-message">
        {hasFilters ? 'По вашему запросу ничего не найдено' : 'Рецепты пока не добавлены'}
      </p>
    )
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          searchQuery={searchQuery}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default RecipeList
