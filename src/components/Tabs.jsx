function Tabs({ categories, activeTab, onChange }) {
  const tabs = [
    { id: 'all', label: 'Все' },
    ...categories.map((category) => ({ id: `category:${category}`, label: category })),
    { id: 'favorites', label: 'Избранное' },
  ]

  return (
    <div className="tabs" role="tablist" aria-label="Фильтр рецептов">
      {tabs.map((tab) => (
        <button
          className={activeTab === tab.id ? 'tabs__button tabs__button--active' : 'tabs__button'}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          key={tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
