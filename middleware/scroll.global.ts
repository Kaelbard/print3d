// middleware/scroll.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.hash === "#contact") {
    setTimeout(() => {
      const footer = document.querySelector("#contact");
      if (footer) {
        const offset = 100;
        const elementPosition = footer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100); // pequeno delay para garantir que o DOM foi carregado
  }
});
