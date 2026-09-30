import { useEffect, useMemo, useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeModal from './components/RecipeModal'
import ConfirmModal from './components/ConfirmModal'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import initialRecipes from './data/initialRecipes'

const STORAGE_KEY = 'recipe-book-recipes'

function getInitialRecipes() {
  try {
    const savedRecipes = localStorage.getItem(STORAGE_KEY)
    const parsedRecipes = savedRecipes ? JSON.parse(savedRecipes) : initialRecipes
    return Array.isArray(parsedRecipes) ? parsedRecipes : initialRecipes
  } catch {
    return initialRecipes
  }
}

function App() {
  const [recipes, setRecipes] = useState(getInitialRecipes)
  const [activeTab, setActiveTab] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [recipeToDelete, setRecipeToDelete] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchQuery(searchText.trim())
    }, 400)

    return () => clearTimeout(timerId)
  }, [searchText])

  const categories = useMemo(
    () => [...new Set(recipes.map((recipe) => recipe.category))].sort((a, b) => a.localeCompare(b, 'ru')),
    [recipes],
  )

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase()

    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(normalizedQuery)
      const matchesTab = activeTab === 'all'
        || (activeTab === 'favorites' && recipe.isFavorite)
        || activeTab === `category:${recipe.category}`

      return matchesSearch && matchesTab
    })
  }, [recipes, activeTab, searchQuery])

  useEffect(() => {
    const categoryExists = activeTab === 'all'
      || activeTab === 'favorites'
      || categories.some((category) => activeTab === `category:${category}`)

    if (!categoryExists) setActiveTab('all')
  }, [activeTab, categories])

  const handleToggleFavorite = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe,
      ),
    )
  }

  const handleOpenAdd = () => {
    setEditingRecipe(null)
    setIsRecipeModalOpen(true)
  }

  const handleOpenEdit = (recipe) => {
    setEditingRecipe(recipe)
    setIsRecipeModalOpen(true)
  }

  const handleCloseRecipeModal = () => {
    setIsRecipeModalOpen(false)
  }

  const handleSaveRecipe = (formData) => {
    if (editingRecipe) {
      setRecipes((currentRecipes) => currentRecipes.map((recipe) => (
        recipe.id === editingRecipe.id ? { ...recipe, ...formData } : recipe
      )))
    } else {
      setRecipes((currentRecipes) => [
        ...currentRecipes,
        { ...formData, id: Date.now(), isFavorite: false },
      ])
    }

    setIsRecipeModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!recipeToDelete) return

    setRecipes((currentRecipes) => (
      currentRecipes.filter((recipe) => recipe.id !== recipeToDelete.id)
    ))
    setRecipeToDelete(null)
  }

  const handleClearSearch = () => {
    setSearchText('')
    setSearchQuery('')
  }

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="page-header__label">Книга рецептов</p>
          <h1>Мои рецепты</h1>
          <p>Сохраняйте любимые блюда и собирайте свою домашнюю коллекцию.</p>
        </div>
        <button className="button button--primary add-button" type="button" onClick={handleOpenAdd}>
          <span aria-hidden="true">+</span> Добавить рецепт
        </button>
      </header>

      <section className="controls" aria-label="Поиск и фильтры">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onClear={handleClearSearch}
        />
        <Tabs categories={categories} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <p className="results-count" aria-live="polite">
        Найдено рецептов: <strong>{filteredRecipes.length}</strong>
      </p>

      <RecipeList
        recipes={filteredRecipes}
        searchQuery={searchQuery}
        hasFilters={activeTab !== 'all' || Boolean(searchQuery)}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleOpenEdit}
        onDelete={setRecipeToDelete}
      />

      <RecipeModal
        isOpen={isRecipeModalOpen}
        recipe={editingRecipe}
        categories={categories}
        onSave={handleSaveRecipe}
        onClose={handleCloseRecipeModal}
      />
      <ConfirmModal
        isOpen={Boolean(recipeToDelete)}
        recipe={recipeToDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setRecipeToDelete(null)}
      />
    </main>
  )
}

export default App
