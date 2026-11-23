function CourseCard({
  course,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) {
  function handleFavorite(event) {
    event.stopPropagation();
    onToggleFavorite(course.id);
  }

  return (
    <article className="course-card">
      <button
        type="button"
        className="course-card-main"
        onClick={() => onSelect(course)}
        aria-label={`Assistir aula: ${course.title}`}
      >
        <span className="thumbnail-wrap">
          <img
            src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
            alt={`Capa da aula ${course.title}`}
            loading="lazy"
          />
          <span className="play-indicator" aria-hidden="true">
            ▶
          </span>
        </span>
        <span className="course-card-copy">
          <span className="course-card-title">{course.title}</span>
          <span className="course-card-description">{course.description}</span>
        </span>
      </button>
      <button
        type="button"
        className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
        onClick={handleFavorite}
        aria-label={
          isFavorite
            ? `Remover ${course.title} dos favoritos`
            : `Adicionar ${course.title} aos favoritos`
        }
        aria-pressed={isFavorite}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </article>
  );
}

export default CourseCard;
