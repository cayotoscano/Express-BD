function Header({
  categories,
  searchTerm,
  onSearchChange,
  favoritesCount,
}) {
  return (
    <header className="header">
      <a href="#home" className="logo" aria-label="DevFlix, início">
        DEVFLIX
      </a>

      <nav aria-label="Menu principal" className="main-nav">
        <a href="#home">HOME</a>
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.title}
          </a>
        ))}
        <a href="#favorites" className="favorites-link">
          Favoritos <span className="favorites-count">{favoritesCount}</span>
        </a>
      </nav>

      <label className="search-field">
        <span className="visually-hidden">Buscar aulas</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="search-icon"
          focusable="false"
        >
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          type="search"
          placeholder="Buscar aulas"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </header>
  );
}

export default Header;
