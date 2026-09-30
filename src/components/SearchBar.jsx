function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск рецептов..."
        aria-label="Поиск рецептов по названию"
      />
      {value && (
        <button type="button" onClick={onClear} aria-label="Очистить поиск">
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
