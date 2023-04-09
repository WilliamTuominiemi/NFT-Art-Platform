import { type Translations } from "@/locales/Translations";

export const finnishTranslations: Translations = {
  errorMessages: {
    error: "Virhe",
    createPostError: "Piirustusta ei voitu lähettää",
    likeError: "Piirustusta ei voitu tykätä",
    unLikeError: "Tykkäystä ei voitu poistaa",
    getPostsError: "Piirroksia ei voitu ladata",
    notFound: "Sivua ei löytynyt",
    getProfileError: "Profiilia ei löytynyt",
    noPostsYet: "Piirustuksia ei vielä ole",
    noLikesYet: "Piirustuksia ei vielä ole tykätty",
    deleteError: "Piirustusta ei voitu poistaa",
    tryAgain: "Yritä uudelleen",
    goHome: "Mene kotiin",
  },
  navbar: {
    draw: "Piirrä",
    login: "Kirjaudu",
    logout: "Kirjaudu ulos",
    profile: "Profiili",
    theme: "Teema",
    language: "Kieli",
    light: "Vaalea",
    dark: "Tumma",
    system: "Systeemi",
  },
  footer: {
    builtBy: "Rakennettu",
    sourceCode: "Koodi on saatavilla",
  },
  create: {
    create: "Luo",
    color: "Väri",
    thickness: "Paksuus",
    clear: "Tyhjennä",
    undo: "Kumoa",
    redo: "Tee uudelleen",
  },
  home: {
    title: "Fiidi",
    description: "Piirroksia yhteisöstä",
    loadMore: "Lataa lisää",
  },
  profile: {
    drawings: "Piirrokset",
    likedDrawings: "Tykätyt",
    joined: "Liittyi",
  },
  postMenu: {
    share: "Jaa",
    copyLink: "Kopioi linkki",
    delete: "Poista",
    pin: "Kiinnitä profiiliin",
    unpin: "Poista profiilista",
    deleteDialog: {
      title: "Poista piirustus",
      description: "Haluatko varmasti poistaa tämän piirustuksen?",
      cancel: "Peruuta",
    },
  },
};
