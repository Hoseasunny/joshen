import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Sparkling Clean Homes: Why Professional Cleaning Services Are a Game-Changer",
    excerpt: "Imagine walking into your home after a long day at work, greeted by the fresh scent of cleanliness... Discover why professional cleaning is essential for modern living.",
    date: "March 14, 2026",
    slug: "sparkling-clean-homes",
    featuredImage: "https://via.placeholder.com/400x250?text=Sparkling+Clean+Home"
  },
  {
    id: 2,
    title: "5 AI-backed ways to keep your home cleaner between visits",
    excerpt: "Simple routines driven by usage patterns and high-touch zone prioritization. Learn practical tips to maintain cleanliness.",
    date: "March 2026",
    slug: "ai-cleaning-tips",
    featuredImage: "https://via.placeholder.com/400x250?text=AI+Cleaning+Tips"
  },
  {
    id: 3,
    title: "How to reduce office dust buildup by 40%",
    excerpt: "A practical workflow combining ventilation checks, zoning, and scheduling strategy for cleaner workspaces.",
    date: "February 2026",
    slug: "office-dust-reduction",
    featuredImage: "https://via.placeholder.com/400x250?text=Office+Dust+Reduction"
  },
  {
    id: 4,
    title: "Before/After checklist for move-out cleaning",
    excerpt: "A room-by-room framework to secure faster handovers and fewer disputes during property transitions.",
    date: "January 2026",
    slug: "move-out-checklist",
    featuredImage: "https://via.placeholder.com/400x250?text=Move+Out+Checklist"
  }
];

export default function Blog() {
  return (
    <section className="section blog-page">
      <div className="container">
        <div className="section-head">
          <h1>Cleaning Tips and Insights</h1>
          <p>AI-assisted guides and best practices from our operations team to help you maintain cleaner spaces.</p>
        </div>
        <div className="blog-list">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-list-item">
              <img src={post.featuredImage} alt={post.title} className="blog-list-image" />
              <div className="blog-list-content">
                <small>{post.date}</small>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="btn">Read More</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}