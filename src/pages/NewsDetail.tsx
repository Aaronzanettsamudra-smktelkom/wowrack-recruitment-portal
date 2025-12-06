import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { newsArticles } from "@/lib/mockData";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/news">Back to News</Link>
          </Button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== id && a.category === article.category)
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Article link copied to clipboard" });
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <article>
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container relative -mt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-8 md:p-12 shadow-card"
          >
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-6 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {article.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {article.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="lead text-lg">{article.excerpt}</p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Key Highlights</h2>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Innovation and collaboration drive our success</li>
                <li>Employee well-being is at the heart of everything we do</li>
                <li>Continuous learning opportunities for career growth</li>
                <li>Diverse and inclusive workplace culture</li>
              </ul>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Share */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <span className="text-sm font-medium text-foreground">Share this article</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("copy")}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 mt-12 bg-muted/30">
            <div className="container">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/news/${related.id}`}
                    className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="outline" className="text-xs mb-2">
                        {related.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <PublicFooter />
    </div>
  );
}
