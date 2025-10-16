import { useEffect } from "react";

const Animation = () => {
  useEffect(() => {
    // Sélectionne tous les éléments fadeIn et fadeIn2
    const elements = document.querySelectorAll(".fadeIn, .fadeIn2, .fadeIn3");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // Stop observer après l'apparition
          }
        });
      },
      { threshold: 0.1 } // déclenche quand 10% de l'élément est visible
    );

    // On observe chaque élément
    elements.forEach((el) => observer.observe(el));

    // Cleanup à la destruction
    return () => observer.disconnect();
  }, []); // [] = exécuté une seule fois au montage
};

export default Animation;
