const API_URL = "https://script.google.com/macros/s/AKfycbzZSxCUkyXCshOy-e0hgGSjwZ-rxnctbVYSw3HHE7ieq4CBHGLhMgRJvGLcHyMOjNkF0A/exec";
export async function fetchBlogs() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${API_URL}?slug=${slug}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}
