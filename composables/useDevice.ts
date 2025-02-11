// composables/useDevice.ts
import { ref } from "vue";

export function useDevice() {
  const isMobile = ref(false);

  if (process.client) {
    const checkDevice = () => {
      isMobile.value = window.innerWidth < 768;
    };

    // Checar inicialmente
    checkDevice();

    // Adicionar listener apenas no cliente
    window.addEventListener("resize", checkDevice);

    // Cleanup (será chamado quando o componente for desmontado)
    onUnmounted(() => {
      window.removeEventListener("resize", checkDevice);
    });
  }

  return {
    isMobile,
  };
}
