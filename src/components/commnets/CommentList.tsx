import CommentItem from "./CommentItem";

export default function CommentList({ comments, onReload }: any) {
  const roots = comments.filter((c: any) => !c.parentId);

  return (
    <div className="space-y-6">
      {roots.map((c: any) => (
        <CommentItem
          key={c.commentId}
          comment={c}
          replies={comments.filter((r: any) => r.parentId === c.commentId)}
          onReload={onReload}
        />
      ))}
    </div>
  );
}
