import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ResumePDF from '@/assets/Vedant14.pdf'; // import your resume

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'vedantshinde305@example.com', link: 'mailto:vedantshinde305@example.com' },
    { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '+91 86524 00980', link: 'tel:+918652400980' },
    { icon: <MapPin className="h-5 w-5" />, label: 'Location', value: 'India', link: null }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', url: 'https://github.com/Developer1503', color: 'hover:text-foreground' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/vedant-shinde-119866242/', color: 'hover:text-blue-600' },
    { icon: <Mail className="h-5 w-5" />, label: 'Email', url: 'mailto:vedant.shinde@example.com', color: 'hover:text-red-600' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.fade-on-scroll');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) { toast({ title: "Validation Error", description: "Please enter your name", variant: "destructive" }); return false; }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { toast({ title: "Validation Error", description: "Please enter a valid email address", variant: "destructive" }); return false; }
    if (!formData.subject.trim()) { toast({ title: "Validation Error", description: "Please enter a subject", variant: "destructive" }); return false; }
    if (!formData.message.trim()) { toast({ title: "Validation Error", description: "Please enter your message", variant: "destructive" }); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({ title: "Message Sent Successfully!", description: "Thank you for your message. I'll get back to you soon.", variant: "default" });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-on-scroll text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on exciting AI projects or discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info + Resume */}
          <div className="fade-on-scroll space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Whether you're interested in collaborating on AI/ML projects, discussing technology, or exploring new opportunities, I'm always excited to connect with fellow innovators and professionals.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} className="text-foreground hover:text-primary transition-colors duration-300 font-medium">{info.value}</a>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Download + View */}
            <Card className="project-card border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Resume</h4>
                    <p className="text-sm text-muted-foreground">Get a detailed overview of my experience and skills</p>
                  </div>
                  <div className="flex gap-2">
                    {/* View Button */}
                    <a
                      href={ResumePDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </a>
                    {/* Download Button */}
                    <a
                      href={ResumePDF}
                      download
                      className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="fade-on-scroll">
            <Card className="project-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleInputChange} required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required className="bg-background/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" type="text" placeholder="What's this about?" value={formData.subject} onChange={handleInputChange} required className="bg-background/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" placeholder="Tell me about your project or how I can help..." rows={5} value={formData.message} onChange={handleInputChange} required className="bg-background/50 resize-none" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-hero group text-lg py-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    I typically respond within 24 hours. Looking forward to connecting!
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
