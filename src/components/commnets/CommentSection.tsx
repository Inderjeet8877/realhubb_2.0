import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzbSl75EHN1VHLKh7wxgluasooHDXvF4OjaZosm5Ue9-XfnRcLOCUiUVX_TwnBgFkSa/exec";

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([]);

  const loadComments = async () => {
    try {
      const res = await fetch(`${API_URL}?slug=${slug}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [slug]);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-normal mb-4">Comments</h2>
      {/* New comment */}
      <CommentForm slug={slug} onSuccess={loadComments} />

      {/* List of comments/replies */}
      <CommentList comments={comments} onReload={loadComments} />
    </section>
  );
}
