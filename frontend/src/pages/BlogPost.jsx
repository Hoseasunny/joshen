import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Mock fetch - in real app, fetch from API
    const mockPost = {
      title: "The Ultimate Guide to Sparkling Clean Homes: Why Professional Cleaning Services Are a Game-Changer",
      author: "JOSHEM Team",
      date: "March 14, 2026",
      featuredImage: "https://via.placeholder.com/800x400?text=Sparkling+Clean+Home",
      body: `
        <h2>Introduction</h2>
        <p>Imagine walking into your home after a long day at work, greeted by the fresh scent of cleanliness and the sight of gleaming surfaces. No dust bunnies in the corners, no sticky fingerprints on the fridge, just pure, sparkling perfection. Sounds like a dream? With professional cleaning services from JOSHEM, this can be your everyday reality.</p>
        <p>In today's fast-paced world, maintaining a clean home or office isn't just about aesthetics—it's about health, productivity, and peace of mind. But let's face it, finding the time and energy to tackle deep cleaning can be challenging. That's where we come in. At JOSHEM, we're not just cleaners; we're your partners in creating healthier, happier spaces.</p>

        <h2>The Benefits of Professional Cleaning Services</h2>
        <p>Why choose professional cleaning over DIY? The advantages are numerous and impactful:</p>
        <h3>Health and Hygiene</h3>
        <p>Professional cleaners use hospital-grade disinfectants and specialized equipment to eliminate 99.9% of bacteria, viruses, and allergens. This is especially crucial for households with children, elderly family members, or anyone with respiratory issues.</p>
        <h3>Time-Saving</h3>
        <p>Our expert team can complete a thorough cleaning in hours, freeing you up for what matters most—spending quality time with family, focusing on your career, or simply relaxing.</p>
        <h3>Expertise and Equipment</h3>
        <p>We bring professional-grade tools and techniques that go beyond what consumer products can achieve. From steam cleaning carpets to deep-cleaning upholstery, we ensure every nook and cranny is pristine.</p>
        <h3>Consistency and Reliability</h3>
        <p>With scheduled cleanings, you can maintain that "just cleaned" feeling without the hassle. Our trained professionals deliver consistent, high-quality results every time.</p>

        <h2>Practical Tips for Maintaining a Clean Home</h2>
        <p>While professional services handle the heavy lifting, here are some practical tips to keep your space sparkling between cleanings:</p>
        <h3>Daily Habits</h3>
        <p>Make it a habit to wipe down surfaces after use. A quick swipe with a microfiber cloth can prevent buildup and make deep cleaning easier.</p>
        <h3>Weekly Routines</h3>
        <p>Dedicate 15-20 minutes each week to high-traffic areas. Vacuum carpets, dust surfaces, and clean bathrooms to maintain cleanliness.</p>
        <h3>Seasonal Deep Cleans</h3>
        <p>Schedule professional deep cleans seasonally. Spring cleaning isn't just a tradition—it's essential for removing winter grime and preparing for warmer months.</p>
        <h3>Smart Storage Solutions</h3>
        <p>Invest in organizational tools like drawer dividers and closet organizers. A place for everything means less clutter and easier cleaning.</p>

        <h2>Choosing the Right Cleaning Service</h2>
        <p>Not all cleaning services are created equal. Here's what to look for:</p>
        <h3>Experience and Training</h3>
        <p>Choose services with trained, background-checked professionals. At JOSHEM, all our cleaners undergo rigorous training and are fully insured.</p>
        <h3>Eco-Friendly Options</h3>
        <p>Opt for services using green cleaning products. They're safer for your family and the environment, yet just as effective.</p>
        <h3>Flexible Scheduling</h3>
        <p>Look for services offering convenient booking and recurring options. Our online platform lets you book and track services 24/7.</p>
        <h3>Transparent Pricing</h3>
        <p>Avoid hidden fees. We provide upfront quotes with no surprises, ensuring you get the best value for your investment.</p>

        <h2>Conclusion</h2>
        <p>In a world where time is our most precious commodity, professional cleaning services aren't a luxury—they're a necessity. By partnering with JOSHEM, you're not just getting a clean space; you're investing in your health, productivity, and overall well-being.</p>
        <p>Ready to experience the JOSHEM difference? Book your first cleaning service today and discover why thousands of satisfied customers trust us with their spaces. Visit our website, choose your service, and let us handle the rest. Your sparkling clean home awaits!</p>
        <p>Contact us at info@joshem.com or call (555) 123-4567 to get started.</p>
      `
    };

    const mockRelated = [
      { id: 1, title: "Top 10 Eco-Friendly Cleaning Products for 2026", slug: "eco-friendly-products" },
      { id: 2, title: "How to Prepare Your Home for Professional Cleaning", slug: "prepare-home-cleaning" },
      { id: 3, title: "The Business Benefits of Office Cleaning Services", slug: "office-cleaning-benefits" }
    ];

    setPost(mockPost);
    setRelatedPosts(mockRelated);
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <section className="section blog-post-section">
      <div className="container blog-post-container">
        <article className="blog-post">
          <header className="blog-hero">
            <img src={post.featuredImage} alt={post.title} className="blog-featured-image" />
            <h1>{post.title}</h1>
            <div className="blog-meta">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
          </header>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
        <aside className="blog-sidebar">
          <h3>Related Posts</h3>
          <ul>
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link to={`/blog/${related.slug}`}>{related.title}</Link>
              </li>
            ))}
          </ul>
          <Link to="/" className="btn">Back to Home</Link>
        </aside>
      </div>
    </section>
  );
}