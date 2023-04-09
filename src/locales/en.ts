import { type Translations } from "@/locales/Translations";

export const englishTranslations: Translations = {
  errorMessages: {
    error: "Error",
    createPostError: "Could not post drawing",
    likeError: "Could not like drawing",
    unLikeError: "Could not unlike drawing",
    getPostsError: "There was an error fetching the drawings",
    notFound: "Page not found",
    getProfileError: "Could not find profile",
    noPostsYet: "No drawings yet",
    noLikesYet: "No liked drawings yet",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  navbar: {
    draw: "Draw",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  footer: {
    builtBy: "Built by",
    sourceCode: "The source code is available on",
  },
  create: {
    create: "Create",
    color: "Color",
    thickness: "Thickness",
    clear: "Clear",
    undo: "Undo",
    redo: "Redo",
  },
  home: {
    title: "Feed",
    description: "Drawings from the community",
    loadMore: "Load more",
  },
  profile: {
    drawings: "Drawings",
    likedDrawings: "Likes",
    joined: "Joined",
  },
  postMenu: {
    share: "Share",
    copyLink: "Copy link",
    delete: "Delete",
    pin: "Pin to profile",
    unpin: "Unpin from profile",
  },
};
