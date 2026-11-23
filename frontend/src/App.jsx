import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CourseCard from "./components/CourseCard.jsx";
import CourseSection from "./components/CourseSection.jsx";
import Header from "./components/Header.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import { categories as localCategories } from "./data/courses.js";
import { fetchCategories, fetchFavorites, syncFavorites } from "./services/api.js";

const FAVORITES_KEY = "devflix:favorites";
const USER_KEY = "devflix:user-id";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function readStoredFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn("Não foi possível ler os favoritos salvos neste navegador.", error);
    return [];
  }
}

function getUserId() {
  const savedId = localStorage.getItem(USER_KEY);
  if (savedId) return savedId;

  const userId = `devflix-${crypto.randomUUID()}`;
  localStorage.setItem(USER_KEY, userId);
  return userId;
}

function App() {
  const [categories, setCategories] = useState(localCategories);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites);
  const [userId] = useState(getUserId);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetchCategories().then((items) => {
      if (active && Array.isArray(items)) setCategories(items);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchFavorites(userId)
      .then(({ courseIds }) => {
        if (active && Array.isArray(courseIds) && courseIds.length > 0) {
          setFavoriteIds(courseIds);
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(courseIds));
        }
      })
      .catch((error) => {
        console.warn("Não foi possível carregar favoritos da API; usando dados locais.", error);
      })
      .finally(() => {
        if (active) setFavoritesLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!favoritesLoaded) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    syncFavorites(userId, favoriteIds).catch((error) => {
      console.warn("Favoritos salvos localmente; sincronização indisponível.", error);
    });
  }, [favoriteIds, favoritesLoaded, userId]);

  const filteredCategories = useMemo(() => {
    const query = normalizeText(searchTerm);
    if (!query) return categories;

    return categories.map((category) => ({
      ...category,
      courses: category.courses.filter((course) =>
        normalizeText(`${course.title} ${course.description}`).includes(query),
      ),
    }));
  }, [categories, searchTerm]);

  const allCourses = useMemo(
    () => categories.flatMap((category) => category.courses),
    [categories],
  );
  const visibleCourses = filteredCategories.flatMap((category) => category.courses);
  const favoriteCourses = allCourses.filter(
    (course) =>
      favoriteIds.includes(course.id) &&
      normalizeText(`${course.title} ${course.description}`).includes(
        normalizeText(searchTerm),
      ),
  );

  const handleSelectCourse = useCallback((course) => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedCourse(course);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  const handleToggleFavorite = useCallback((courseId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(courseId)
        ? currentIds.filter((id) => id !== courseId)
        : [...currentIds, courseId],
    );
  }, []);

  return (
    <>
      <Header
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        favoritesCount={favoriteIds.length}
      />
      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">SEU PRÓXIMO NÍVEL COMEÇA AQUI</p>
            <h1>Bem-vindo ao DevFlix</h1>
            <p>Aprenda programação com aulas gratuitas.</p>
            <a href="#frontend" className="hero-button">
              Explorar aulas
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="code-symbol">&lt;/&gt;</span>
            <span className="art-glow" />
          </div>
        </section>

        <div className="catalog">
          {searchTerm && visibleCourses.length === 0 && (
            <p className="empty-message search-empty" role="status">
              Nenhuma aula encontrada para “{searchTerm}”. Tente outro termo.
            </p>
          )}
          {filteredCategories.map((category) => (
            <CourseSection
              key={category.id}
              category={category}
              onSelect={handleSelectCourse}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}

          <section id="favorites" className="course-section favorites-section">
            <h2>Meus Favoritos</h2>
            {favoriteCourses.length > 0 ? (
              <div className="course-grid">
                {favoriteCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={handleSelectCourse}
                    isFavorite
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-message">
                {searchTerm && favoriteIds.length > 0
                  ? "Nenhum favorito corresponde à sua busca."
                  : "Você ainda não adicionou aulas aos favoritos."}
              </p>
            )}
          </section>
        </div>
      </main>
      <footer className="footer">
        <span>DEVFLIX</span>
        <p>Aprender programação pode ser simples. Comece pela próxima aula.</p>
      </footer>
      <VideoPlayer
        course={selectedCourse}
        onClose={handleCloseVideo}
        returnFocusRef={returnFocusRef}
      />
    </>
  );
}

export default App;
