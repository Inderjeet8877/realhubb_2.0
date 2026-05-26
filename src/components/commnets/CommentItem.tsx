import { useState } from "react";
import { Heart } from "lucide-react";
import CommentForm from "./CommentForm";
import { hasLiked, markLiked } from "./likes";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzbSl75EHN1VHLKh7wxgluasooHDXvF4OjaZosm5Ue9-XfnRcLOCUiUVX_TwnBgFkSa/exec";

export default function CommentItem({
  comment,
  replies,
  onReload,
}: any) {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [liked, setLiked] = useState(hasLiked(comment.commentId));

  const handleLike = async () => {
    if (liked) return;

    markLiked(comment.commentId);
    setLiked(true);
    setLikes((prev: number) => prev + 1);

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        type: "LIKE",
        commentId: comment.commentId,
      }),
    });

    onReload();
  };

  return (
    <div className="border-l pl-4">
      <p className="font-normal">{comment.name}</p>
      <p className="text-xs text-gray-400">
        {new Date(comment.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}
      </p>
      <p className="mt-1">{comment.comment}</p>

      <button
        onClick={handleLike}
        disabled={liked}
        className="flex items-center gap-2 text-sm mt-2 disabled:opacity-50"
      >
        <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
        {likes}
      </button>

      <CommentForm
        slug={comment.postSlug}
        parentId={comment.commentId}
        onSuccess={onReload}
      />

      <div className="ml-6 mt-4 space-y-4">
        {replies.map((r: any) => (
          <CommentItem
            key={r.commentId}
            comment={r}
            replies={[]}
            onReload={onReload}
          />
        ))}
      </div>
    </div>
  );
}
