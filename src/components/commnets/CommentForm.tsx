import { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzbSl75EHN1VHLKh7wxgluasooHDXvF4OjaZosm5Ue9-XfnRcLOCUiUVX_TwnBgFkSa/exec";

export default function CommentForm({
  slug,
  parentId,
  onSuccess,
}: any) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        postSlug: slug,
        name,
        comment,
        parentId: parentId || "",
      }),
    });

    setName("");
    setComment("");
    onSuccess();
  };

  return (
    <div className="mb-4">
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2 border rounded"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-[#00274D] text-white rounded-lg hover:bg-[#001d3a] transition-colors"
      >
        Submit
      </button>
    </div>
  );
}
