import { useEffect } from "react";

function VideoPlayer({ course, onClose, returnFocusRef }) {
  useEffect(() => {
    if (!course) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [course, onClose, returnFocusRef]);

  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={course.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Fechar vídeo"
          autoFocus
        >
          ✕
        </button>
        <h2>{course.title}</h2>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1`}
            title={course.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
