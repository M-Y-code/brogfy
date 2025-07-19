import Link from "next/link";
import Image from "next/image";
import type { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "priorityHigh";
      case "medium":
        return "priorityMedium";
      case "low":
        return "priorityLow";
      default:
        return "priorityLow";
    }
  };

  return (
    <Link href={`/blog/${blog.slug}`} className="card">
      <div className="cardImage">
        <Image
          src={blog.eyecatch?.url || "/globe.svg"}
          alt={blog.title}
          width={400}
          height={200}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
      <div className="cardContent">
        <h3 className="cardTitle">{blog.title}</h3>
        <p className="cardDescription">
          {blog.body?.length > 100
            ? `${blog.body.substring(0, 100)}...`
            : blog.body || "説明文がありません"}
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <span className={`priorityBadge ${getPriorityClass(blog.priority)}`}>
            {blog.priority === "high"
              ? "重要"
              : blog.priority === "medium"
              ? "普通"
              : "低"}
          </span>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <span className="tag">{blog.gameName}</span>
          {blog.category?.name && (
            <span className="tag tagPrimary">{blog.category.name}</span>
          )}
          {blog.tags?.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>

        <div className="cardMeta">
          <span>公開日: {formatDate(blog.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
