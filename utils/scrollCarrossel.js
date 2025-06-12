export function scrollCarrossel(ref, direcao = 1) {
  if (!ref.current) return;

  const carrossel = ref.current;
  const item = carrossel.querySelector(":scope > *");

  if (!item) return;

  const gap = parseInt(getComputedStyle(carrossel).gap) || 16;
  const larguraItem = item.offsetWidth + gap;

  carrossel.scrollBy({ left: larguraItem * direcao, behavior: "smooth" });
}
