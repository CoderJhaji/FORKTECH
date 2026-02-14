import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  dish: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    name: "Priya M.",
    avatar: "PM",
    rating: 5,
    comment: "I'm Jain and I've always missed the depth of flavor in restaurant food. RasSetu's Jain Palak Paneer was unbelievable — it tasted just like the original!",
    dish: "Jain Palak Paneer",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Alex K.",
    avatar: "AK",
    rating: 5,
    comment: "As a vegan, I thought I'd never taste butter chicken again. This app literally saved my dinner party. 98% flavor match is no joke!",
    dish: "Vegan Butter Chicken",
    date: "5 days ago",
  },
  {
    id: "3",
    name: "Sunita R.",
    avatar: "SR",
    rating: 4,
    comment: "The Smart Kitchen Mode is a game-changer. I followed the steps hands-free while cooking for my family. The timers are so helpful.",
    dish: "Keto Tikka Masala",
    date: "1 week ago",
  },
  {
    id: "4",
    name: "James T.",
    avatar: "JT",
    rating: 5,
    comment: "I'm on a strict keto diet and finding Indian food options was impossible. RasSetu's cauliflower tikka masala was the best keto meal I've ever made.",
    dish: "Keto Tikka Masala",
    date: "1 week ago",
  },
  {
    id: "5",
    name: "Meera D.",
    avatar: "MD",
    rating: 5,
    comment: "The flavor science behind this is incredible. My family couldn't tell the difference between my regenerated recipe and the original. Mind = blown 🤯",
    dish: "Vegan Butter Chicken",
    date: "2 weeks ago",
  },
  {
    id: "6",
    name: "Carlos V.",
    avatar: "CV",
    rating: 4,
    comment: "Love how it respects cultural traditions while making food accessible. The molecular matching feature is genius. Would love more Latin American recipes!",
    dish: "Vegan Enchiladas",
    date: "2 weeks ago",
  },
];

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => interactive && onRate?.(star)}
        className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
      >
        <Star
          className={`h-5 w-5 ${star <= rating ? "fill-primary text-primary" : "text-border"}`}
        />
      </button>
    ))}
  </div>
);

const Reviews = () => {
  const [newRating, setNewRating] = useState(0);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [reviews, setReviews] = useState(mockReviews);

  const handleSubmit = () => {
    if (!newName.trim() || !newComment.trim() || newRating === 0) return;
    const review: Review = {
      id: String(Date.now()),
      name: newName.trim(),
      avatar: newName.trim().split(" ").map(n => n[0]).join("").toUpperCase(),
      rating: newRating,
      comment: newComment.trim(),
      dish: "Custom Recipe",
      date: "Just now",
    };
    setReviews([review, ...reviews]);
    setNewName("");
    setNewComment("");
    setNewRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
                What Cooks Are Saying
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Real stories from home chefs who transformed their cooking with RasSetu.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl">
          {/* Write a Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 mb-12 max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-2xl font-bold mb-6">Write a Review</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Rating</label>
                <StarRating rating={newRating} onRate={setNewRating} interactive />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Chef Priya"
                  className="rounded-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Review</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about your cooking experience..."
                  className="rounded-3xl min-h-[100px]"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSubmit}
                  disabled={!newName.trim() || !newComment.trim() || newRating === 0}
                  className="btn-hero w-full disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Reviews Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="glass-card p-6 break-inside-avoid"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="mt-3 text-foreground/90 leading-relaxed">{review.comment}</p>

                <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  🍳 {review.dish}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
