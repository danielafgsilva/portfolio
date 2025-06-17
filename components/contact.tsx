"use client"

import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button" // Import buttonVariants
import { cn } from "@/lib/utils" // Import cn
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Have a project in mind or just want to say hi? Feel free to reach out.
          </p>
          <div className="mt-12 max-w-xl mx-auto">
            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <Input type="text" placeholder="Your Name" required />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" required />
              </div>
              <div>
                <Textarea placeholder="Your Message" rows={4} required />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
            <div className="mt-8 text-center">
              <Button
                size="lg"
                asChild // Ensures the <a> tag is the actual rendered element
              >
                <a
                  href="/cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  // Explicitly apply button classes here.
                  // The Button component with asChild should pass its classes,
                  // but this makes sure the <a> tag itself is styled.
                  // We use cn() to merge with classes from the parent Button.
                  // The variant is default, size is lg.
                  className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                >
                  View CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
