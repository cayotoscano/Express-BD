import CourseCard from "./CourseCard.jsx";

function CourseSection({
  category,
  onSelect,
  favoriteIds,
  onToggleFavorite,
}) {
  return (
    <section id={category.id} className="course-section">
      <h2>{category.title}</h2>
      {category.courses.length > 0 ? (
        <div className="course-grid">
          {category.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelect}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">Nenhuma aula encontrada nesta categoria.</p>
      )}
    </section>
  );
}

export default CourseSection;
