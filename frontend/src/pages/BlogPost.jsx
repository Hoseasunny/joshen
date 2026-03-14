import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    // Mock fetch based on slug
    const posts = {
      "sparkling-clean-homes": {
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
      },
      "ai-cleaning-tips": {
        title: "5 AI-backed ways to keep your home cleaner between visits",
        author: "JOSHEM Team",
        date: "March 2026",
        featuredImage: "https://via.placeholder.com/800x400?text=AI+Cleaning+Tips",
        body: `
          <h2>Introduction</h2>
          <p>In today's smart home era, artificial intelligence isn't just for entertainment—it's revolutionizing how we maintain clean spaces. At JOSHEM, we've analyzed thousands of cleaning patterns to develop AI-backed strategies that help homeowners keep their spaces pristine between professional cleanings. Here are five proven methods that leverage data and smart habits to maximize cleanliness with minimal effort.</p>

          <h2>1. Usage Pattern Analysis</h2>
          <p>AI algorithms can track which areas of your home get used most frequently. By identifying high-traffic zones, you can prioritize cleaning efforts where they matter most.</p>
          <h3>How to Implement</h3>
          <p>Keep a simple journal for one week noting which rooms and surfaces you touch most. Focus 70% of your daily cleaning time on these high-impact areas. For example, if your kitchen counters and bathroom sink are your most-used surfaces, wipe them down after each use rather than waiting for a full cleaning session.</p>

          <h2>2. Predictive Maintenance Scheduling</h2>
          <p>Based on historical data, AI can predict when certain areas are likely to need attention. This prevents buildup before it becomes a problem.</p>
          <h3>Practical Application</h3>
          <p>Set reminders for tasks based on frequency: daily for high-touch surfaces, weekly for floors, monthly for deep-clean areas. Use your phone's calendar or a smart home assistant to send notifications at optimal times.</p>

          <h2>3. Smart Inventory Management</h2>
          <p>AI helps track cleaning supplies and suggests restocking before you run out, ensuring you always have what you need for maintenance cleaning.</p>
          <h3>Implementation Tips</h3>
          <p>Create a digital inventory list on your phone. Set minimum thresholds for each item and add them to your shopping list when supplies get low. This prevents the frustration of starting a cleaning task only to discover you're missing essential products.</p>

          <h2>4. Efficiency Optimization</h2>
          <p>AI analyzes your cleaning routines to identify time-wasting steps and suggests more efficient workflows.</p>
          <h3>Real-World Example</h3>
          <p>Instead of cleaning room by room, try task-based cleaning: gather all trash first, then dust all surfaces, then vacuum all floors. This reduces transitions between rooms and keeps you in an efficient flow.</p>

          <h2>5. Progress Tracking and Motivation</h2>
          <p>AI-powered apps can track your cleaning progress and provide positive reinforcement to build sustainable habits.</p>
          <h3>Getting Started</h3>
          <p>Use a habit-tracking app to log your daily cleaning tasks. Set achievable goals and celebrate milestones. Over time, these small wins compound into significantly cleaner living spaces.</p>

          <h2>Conclusion</h2>
          <p>While professional cleaning services like JOSHEM handle the heavy lifting, these AI-backed strategies ensure your home stays cleaner longer. By focusing on high-impact areas, optimizing your routines, and maintaining consistent habits, you'll enjoy a healthier, more organized living environment. Remember, the key to success is consistency—not perfection. Start with one or two strategies and build from there.</p>
          <p>Ready to implement these tips? Contact JOSHEM for a consultation on how we can complement your home maintenance routine with our professional cleaning services.</p>
        `
      },
      "office-dust-reduction": {
        title: "How to reduce office dust buildup by 40%",
        author: "JOSHEM Team",
        date: "February 2026",
        featuredImage: "https://via.placeholder.com/800x400?text=Office+Dust+Reduction",
        body: `
          <h2>Introduction</h2>
          <p>Office dust isn't just an aesthetic issue—it's a productivity killer and potential health hazard. Studies show that excessive dust can reduce concentration, trigger allergies, and even affect air quality. At JOSHEM, our commercial cleaning teams have helped hundreds of offices reduce dust buildup by implementing systematic approaches. Here's how you can achieve similar results with a 40% reduction in dust accumulation.</p>

          <h2>Understanding Dust Sources</h2>
          <p>Before implementing solutions, it's crucial to identify where dust comes from in your office environment.</p>
          <h3>Common Sources</h3>
          <ul>
            <li>Outdoor air infiltration through windows and doors</li>
            <li>Paper particles from printers and documents</li>
            <li>Skin cells and hair from occupants</li>
            <li>Fabric particles from carpets and upholstery</li>
            <li>Construction dust from nearby work</li>
          </ul>

          <h2>1. Optimize Ventilation Systems</h2>
          <p>Proper air filtration is your first line of defense against dust infiltration.</p>
          <h3>Action Steps</h3>
          <p>Schedule regular HVAC filter replacements (every 3 months) and consider upgrading to HEPA filters. Ensure vents are clear of obstructions and maintain positive pressure in clean areas to prevent dust migration.</p>

          <h2>2. Implement Zoning Strategies</h2>
          <p>Not all office areas need the same level of dust control. Create zones based on sensitivity.</p>
          <h3>Practical Implementation</h3>
          <p>Designate "clean zones" for sensitive equipment and "standard zones" for general workspaces. Use physical barriers like door closers and air curtains to maintain separation.</p>

          <h2>3. Establish Cleaning Schedules</h2>
          <p>Regular, systematic cleaning prevents dust from accumulating to problematic levels.</p>
          <h3>Recommended Frequency</h3>
          <ul>
            <li>Daily: High-touch surfaces (desks, keyboards, phones)</li>
            <li>Weekly: Floors, windowsills, and common areas</li>
            <li>Monthly: Ceiling fixtures, high shelves, and air vents</li>
          </ul>

          <h2>4. Reduce Paper Usage</h2>
          <p>Digital transformation significantly reduces dust from paper products.</p>
          <h3>Office Solutions</h3>
          <p>Implement paperless workflows where possible. Store physical documents in enclosed cabinets rather than open shelves. Use anti-static mats under printers to capture toner particles.</p>

          <h2>5. Employee Education and Habits</h2>
          <p>Your team plays a crucial role in dust control.</p>
          <h3>Best Practices</h3>
          <p>Encourage removing shoes at entry points, using desk organizers to reduce clutter, and reporting spills immediately. Provide anti-static cleaning wipes for personal workspaces.</p>

          <h2>Measuring Success</h2>
          <p>Track your progress with simple metrics:</p>
          <ul>
            <li>Visual inspections of surfaces</li>
            <li>Dust accumulation on monitoring cards</li>
            <li>Employee feedback on air quality</li>
            <li>HVAC filter replacement frequency</li>
          </ul>

          <h2>Professional Support</h2>
          <p>While these strategies can reduce dust by 40%, professional cleaning services provide the deep cleaning needed to maintain optimal conditions. JOSHEM's commercial cleaning teams use specialized equipment and techniques to remove embedded dust that regular maintenance can't address.</p>
          <p>Contact us today to learn how our office cleaning services can complement your dust reduction efforts and create a healthier, more productive workspace.</p>
        `
      },
      "move-out-checklist": {
        title: "Before/After checklist for move-out cleaning",
        author: "JOSHEM Team",
        date: "January 2026",
        featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        body: `
          <h2>Introduction</h2>
          <p>Moving out can be stressful enough without worrying about cleaning standards and security deposit recovery. At JOSHEM, we've helped thousands of tenants and landlords navigate move-out cleaning successfully. This comprehensive before/after checklist ensures you cover all bases, minimize disputes, and maximize your chances of getting your full security deposit back.</p>

          <div class="pull-quote">
            <p>"Take before photos of each room to document existing conditions and protect your security deposit."</p>
          </div>

          <h2 id="preparation">Pre-Move-Out Preparation (2-3 Weeks Before) <span class="time-estimate">~30 min</span></h2>
          <p>Start early to avoid last-minute rushes and ensure thorough cleaning.</p>
          <h3>Documentation</h3>
          <ul class="checklist">
            <li><span class="icon">📸</span> Take before photos of each room</li>
            <li><span class="icon">📋</span> Review lease agreement for cleaning requirements</li>
            <li><span class="icon">🔍</span> Note any existing damage or wear</li>
            <li><span class="icon">🧽</span> Schedule professional cleaning if needed</li>
          </ul>

          <h3>Deep Clean Schedule</h3>
          <ul class="checklist">
            <li><span class="icon">🗂️</span> Declutter and remove personal items</li>
            <li><span class="icon">🔧</span> Deep clean appliances and fixtures</li>
            <li><span class="icon">🧼</span> Clean carpets and upholstery</li>
            <li><span class="icon">🖌️</span> Wash walls and ceilings</li>
          </ul>

          <h2 id="kitchen">Kitchen Cleaning Checklist <span class="time-estimate">~2 hours</span></h2>
          <p>The kitchen is often the most scrutinized area during move-out inspections.</p>
          <h3>Appliances</h3>
          <ul class="checklist">
            <li><span class="icon">🍳</span> Oven: Remove racks, clean interior and exterior</li>
            <li><span class="icon">❄️</span> Refrigerator: Defrost, clean shelves and drawers</li>
            <li><span class="icon">🔄</span> Microwave: Clean interior and exterior</li>
            <li><span class="icon">🚿</span> Dishwasher: Run cleaning cycle, clean filter</li>
          </ul>

          <h3>Surfaces and Fixtures</h3>
          <ul class="checklist">
            <li><span class="icon">🧮</span> Countertops: Degrease and polish</li>
            <li><span class="icon">🏪</span> Cabinets: Clean interior and exterior</li>
            <li><span class="icon">🚰</span> Sink and faucet: Remove lime deposits</li>
            <li><span class="icon">🧱</span> Backsplash: Remove grease and grime</li>
          </ul>

          <h2 id="bathroom">Bathroom Deep Clean <span class="time-estimate">~1.5 hours</span></h2>
          <p>Bathrooms require special attention to prevent mold and mildew issues.</p>
          <h3>Fixtures</h3>
          <ul class="checklist">
            <li><span class="icon">🛁</span> Shower/tub: Clean tiles, remove soap scum</li>
            <li><span class="icon">🚽</span> Toilet: Clean interior and exterior, remove stains</li>
            <li><span class="icon">🪞</span> Mirrors: Streak-free cleaning</li>
          </ul>

          <h3>Surfaces</h3>
          <ul class="checklist">
            <li><span class="icon">🧽</span> Walls and ceiling: Remove mildew spots</li>
            <li><span class="icon">🧼</span> Floor: Clean grout lines thoroughly</li>
            <li><span class="icon">💨</span> Exhaust fan: Clean or replace filter</li>
            <li><span class="icon">📏</span> Baseboards: Dust and clean</li>
          </ul>

          <h2 id="living">Living Areas and Bedrooms <span class="time-estimate">~1 hour per room</span></h2>
          <p>These spaces should look move-in ready for the next tenant.</p>
          <h3>Walls and Ceilings</h3>
          <ul class="checklist">
            <li><span class="icon">🖼️</span> Remove scuffs, marks, and tape residue</li>
            <li><span class="icon">💡</span> Clean light fixtures and switch plates</li>
            <li><span class="icon">🌪️</span> Dust ceiling fans and vents</li>
          </ul>

          <h3>Floors</h3>
          <ul class="checklist">
            <li><span class="icon">🧹</span> Vacuum carpets thoroughly</li>
            <li><span class="icon">🧽</span> Mop hard floors, clean baseboards</li>
            <li><span class="icon">🐾</span> Remove pet hair and stains</li>
          </ul>

          <h2 id="final">Final Walk-Through <span class="time-estimate">~30 minutes</span></h2>
          <p>Complete these steps the day before or morning of your move-out inspection.</p>
          <h3>Complete Cleanup</h3>
          <ul class="checklist">
            <li><span class="icon">🗑️</span> Empty all trash and recycling</li>
            <li><span class="icon">🪟</span> Clean windows inside and out</li>
            <li><span class="icon">🚪</span> Clean door frames and doors</li>
            <li><span class="icon">🔌</span> Clean light switches and outlets</li>
          </ul>

          <h3>Final Inspection</h3>
          <ul class="checklist">
            <li><span class="icon">📸</span> Take after photos of each room</li>
            <li><span class="icon">🔧</span> Test all appliances and fixtures</li>
            <li><span class="icon">🗝️</span> Ensure all keys are returned</li>
            <li><span class="icon">📝</span> Complete move-out paperwork</li>
          </ul>

          <h2>Common Move-Out Mistakes to Avoid</h2>
          <p>Learn from others' experiences to protect your security deposit.</p>
          <ul>
            <li>Don't assume "normal wear and tear" excuses everything</li>
            <li>Avoid using abrasive cleaners that damage surfaces</li>
            <li>Don't forget to clean behind and under large items</li>
            <li>Never skip the final walk-through</li>
          </ul>

          <h2>When to Hire Professional Help</h2>
          <p>Sometimes professional cleaning is the best investment for your security deposit.</p>
          <h3>Consider Professional Services If</h3>
          <ul>
            <li>You have limited time before move-out</li>
            <li>The property requires extensive deep cleaning</li>
            <li>You want to ensure maximum deposit recovery</li>
            <li>You have health issues preventing thorough cleaning</li>
          </ul>

          <h2>JOSHEM Move-Out Cleaning Services</h2>
          <p>Our specialized move-out cleaning packages are designed to meet landlord standards and give you the best chance at full deposit recovery. We provide detailed checklists, before/after photos, and cleaning reports to support your move-out process.</p>
          <p>Contact JOSHEM today for a move-out cleaning quote and ensure your transition goes smoothly. We're here to help you move forward with confidence!</p>
        `,
        sections: [
          { id: 'preparation', title: 'Pre-Move-Out Preparation', time: '~30 min' },
          { id: 'kitchen', title: 'Kitchen Cleaning', time: '~2 hours' },
          { id: 'bathroom', title: 'Bathroom Deep Clean', time: '~1.5 hours' },
          { id: 'living', title: 'Living Areas & Bedrooms', time: '~1 hour per room' },
          { id: 'final', title: 'Final Walk-Through', time: '~30 min' }
        ]
      }
    };

    const mockPost = posts[slug];
    if (mockPost) {
      setPost(mockPost);
      // Initialize expanded sections
      if (mockPost.sections) {
        const initialExpanded = {};
        mockPost.sections.forEach(section => {
          initialExpanded[section.id] = true; // Start expanded
        });
        setExpandedSections(initialExpanded);
      }
    }

    const mockRelated = [
      { id: 1, title: "5 AI-backed ways to keep your home cleaner between visits", slug: "ai-cleaning-tips", image: "https://via.placeholder.com/300x200?text=AI+Tips" },
      { id: 2, title: "How to reduce office dust buildup by 40%", slug: "office-dust-reduction", image: "https://via.placeholder.com/300x200?text=Office+Dust" },
      { id: 3, title: "Before/After checklist for move-out cleaning", slug: "move-out-checklist", image: "https://via.placeholder.com/300x200?text=Move+Out" }
    ].filter(r => r.slug !== slug);

    setRelatedPosts(mockRelated);
  }, [slug]);

  if (!post) return <div>Post not found. <Link to="/blog">Back to Blog</Link></div>;

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
          <Link to="/blog" className="btn">Back to Blog</Link>
        </aside>
      </div>
    </section>
  );
}