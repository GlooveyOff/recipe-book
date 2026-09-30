import { useEffect, useState } from 'react'

const emptyRecipe = {
  title: '',
  description: '',
  category: '',
  tooltipText: '',
}

function RecipeForm({ initialRecipe, categories, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyRecipe)

  useEffect(() => {
    setFormData(initialRecipe ? {
      title: initialRecipe.title,
      description: initialRecipe.description,
      category: initialRecipe.category,
      tooltipText: initialRecipe.tooltipText || '',
    } : emptyRecipe)
  }, [initialRecipe])

  const errors = {
    title: formData.title.trim() ? '' : 'Название обязательно',
    description: formData.description.trim() ? '' : 'Описание обязательно',
    category: formData.category.trim() ? '' : 'Категория обязательна',
  }
  const isValid = !errors.title && !errors.description && !errors.category

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      tooltipText: formData.tooltipText.trim(),
    })
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <label>
        <span>Название</span>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Например, сырники"
          autoFocus
        />
        {errors.title && <small className="field-error">{errors.title}</small>}
      </label>

      <label>
        <span>Описание</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Кратко опишите блюдо"
          rows="4"
        />
        {errors.description && <small className="field-error">{errors.description}</small>}
      </label>

      <label>
        <span>Категория</span>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Например, Завтраки"
          list="recipe-categories"
        />
        <datalist id="recipe-categories">
          {categories.map((category) => <option value={category} key={category} />)}
        </datalist>
        {errors.category && <small className="field-error">{errors.category}</small>}
      </label>

      <label>
        <span>Tooltip <em>необязательно</em></span>
        <input
          name="tooltipText"
          value={formData.tooltipText}
          onChange={handleChange}
          placeholder="Подсказка при наведении"
        />
      </label>

      <div className="form-actions">
        <button className="button button--secondary" type="button" onClick={onCancel}>
          Отмена
        </button>
        <button className="button button--primary" type="submit" disabled={!isValid}>
          {initialRecipe ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}

export default RecipeForm
