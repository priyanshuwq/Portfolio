"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import { Send } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] pt-14 sm:pt-16">
        <section id="contact">
          <div className="flex flex-col gap-4 w-full">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold">Contact</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with me. I will get back to you as soon as possible.
                </p>
              </div>
            </BlurFade>
            
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="border-t border-border pt-8 mt-4">
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold">Send me a message</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and I will get back to you as soon as possible.
                  </p>
                </div>
                
                <Card className="p-6 border-2">
                  <form 
                    action={`mailto:${DATA.contact.email}`}
                    method="post"
                    encType="text/plain"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label 
                          htmlFor="name" 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label 
                          htmlFor="email" 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label 
                        htmlFor="message" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell me about your project or just say hello..."
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="gap-2"
                    >
                      <Send className="size-4" />
                      Send Message
                    </Button>
                  </form>
                </Card>
              </div>
            </BlurFade>
          </div>
        </section>
    </main>
  );
}
