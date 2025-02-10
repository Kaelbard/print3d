export const useScroll = () => {
  const scrollToFooter = () => {
    const footer = document.querySelector("#contact");
    if (footer) {
      const offset = 50; // ajuste menor para o header fixo
      const elementPosition = footer.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollToFooter,
  };
};
