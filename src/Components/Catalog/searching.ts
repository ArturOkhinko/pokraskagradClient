type Searching = (search: string | void) => SearchingCatalogType[] | null;
export const searching: Searching = (search) => {
  if (search) {
    if (
      search.toLowerCase().includes("рад") ||
      search.toLowerCase().includes("r2") ||
      search.toLowerCase().includes("r1") ||
      search.toLowerCase().includes("ди") ||
      search.toLowerCase().includes("r3") ||
      search.toLowerCase().includes("пескоструй дисков") ||
      search.toLowerCase().includes("покраска дисков") ||
      search.toLowerCase().includes("диск") ||
      search.toLowerCase().includes("колес") ||
      search.toLowerCase().includes("машин")
    ) {
      return [
        {
          name: "Пескоструй и покраска дисков любых радиусов для легковых машин",
          link: "/wheelInfo",
        },
        {
          name: "Покраска и пескоструй дисков любого радиуса для грузовых машин",
          link: "/trukService",
        },
        { name: "Пескоструй суппортов", link: "/serviceSupports" },
        { name: "Пескоструй любых других деталей", link: "/serviceSandblast" },
      ];
    }
    if (
      search.toLowerCase().includes("пескоструй") ||
      search.toLowerCase().includes("детал") ||
      search.toLowerCase().includes("san") ||
      search.toLowerCase().includes("песок") ||
      search.toLowerCase().includes("пес") ||
      search.toLowerCase().includes("пескоструй других деталей") ||
      search.toLowerCase().includes("пескоструй деталей")
    ) {
      return [
        { name: "Пескоструй супортов", link: "/serviceSupports" },
        {
          name: "Пескоструй и покраска дисков любых радиусов для легковых машин",
          link: "/wheelInfo",
        },
        {
          name: "Покраска и пескоструй дисков любого радиуса для грузовых машин",
          link: "/trukService",
        },
        { name: "Пескоструй других деталей", link: "/serviceSandblast" },
      ];
    }
    if (
      search.toLowerCase().includes("краска") ||
      search.toLowerCase().includes("красска") ||
      search.toLowerCase().includes("покрасить") ||
      search.toLowerCase().includes("порош") ||
      search.toLowerCase().includes("крас") ||
      search.toLowerCase().includes("цв") ||
      search.toLowerCase().includes("порошковая покраска") ||
      search.toLowerCase().includes("покрасска деталей") ||
      search.toLowerCase().includes("покраска деталей")
    ) {
      return [
        {
          name: "Выбрать цвет из нашего каталога в формате RAL, RBG, HTML",
          link: "/colorChoice",
        },
        {
          name: "Покраска и пескоструй дисков любых радиусов для легковых машин",
          link: "/wheelInfo",
        },
        {
          name: "Покраска и пескоструй дисков любых радиусов для грузовых машин",
          link: "/trukService",
        },
        { name: "Покраска и пескоструй суппортов", link: "/serviceSupports" },
      ];
    }
  }
  return null;
};
