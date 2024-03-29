export interface Translations {
  errorMessages: {
    error: string;
    createPostError: string;
    likeError: string;
    unLikeError: string;
    getPostsError: string;
    notFound: string;
    getProfileError: string;
    noPostsYet: string;
    noLikesYet: string;
    deleteError: string;
    pinError: string;
    unPinError: string;
    tryAgain: string;
    goHome: string;
  };
  navbar: {
    profile: string;
    draw: string;
    language: string;
    theme: string;
    login: string;
    logout: string;
    light: string;
    dark: string;
    system: string;
  };
  footer: {
    builtBy: string;
    sourceCode: string;
  };
  create: {
    color: string;
    thickness: string;
    undo: string;
    redo: string;
    clear: string;
    create: string;
  };
  home: {
    title: string;
    description: string;
    loadMore: string;
    pinned: string;
    linkCopied: string;
    orderBy: {
      newest: string;
      oldest: string;
      mostLiked: string;
    };
  };
  profile: {
    drawings: string;
    likedDrawings: string;
    joined: string;
  };
  postMenu: {
    share: string;
    copyLink: string;
    delete: string;
    pin: string;
    unpin: string;
    deleteDialog: {
      title: string;
      description: string;
      cancel: string;
    };
  };
}
