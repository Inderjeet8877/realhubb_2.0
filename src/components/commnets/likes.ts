export const hasLiked = (id: string) =>
  localStorage.getItem(`liked_${id}`) === "1";

export const markLiked = (id: string) =>
  localStorage.setItem(`liked_${id}`, "1");
