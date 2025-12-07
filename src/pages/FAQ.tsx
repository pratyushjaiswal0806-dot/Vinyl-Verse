import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secured with industry-standard encryption.",
  },
  {
    question: "How do you ensure the quality of your vinyl records?",
    answer: "Every record in our collection goes through a rigorous quality inspection process. We check for warping, scratches, and sleeve condition. Only records that meet our high standards make it to our shelves.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. You can see the exact shipping cost at checkout.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on all unopened items. If you receive a defective record, we'll replace it at no additional cost or provide a full refund. Just contact our support team with photos of the issue.",
  },
  {
    question: "How are the records packaged for shipping?",
    answer: "We use specially designed vinyl mailers with reinforced corners and padding. Records are shipped outside of their sleeves to prevent seam splits, and we use stiffeners to protect against bending.",
  },
  {
    question: "Can I track my order?",
    answer: "Absolutely! Once your order ships, you'll receive an email with a tracking number. You can also view your order status anytime by logging into your account.",
  },
  {
    question: "Do you sell rare or collectible records?",
    answer: "Yes, we have a dedicated section for rare and collectible pressings. These include first editions, limited runs, and sought-after releases. New collectibles are added regularly.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team via email at hello@vinylverse.com or through our contact page. We typically respond within 24 hours on business days.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animated-gradient-bg" />
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and policies.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gradient-card rounded-xl border border-border/50 px-6 overflow-hidden animate-fade-up hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Still have questions */}
          <div className="text-center mt-16 animate-fade-up">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact our support team →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
