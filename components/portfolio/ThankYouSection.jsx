import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Mail, Briefcase, FileDown, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/25549073/ukizo90/";

export default function ThankYouSection({ person, variant = "dark" }) {
  const [sendingToZapier, setSendingToZapier] = useState(false);

  const handleSendToZapier = async () => {
    setSendingToZapier(true);
    try {
      const payload = {
        id: person.id,
        full_name: person.full_name,
        title: person.title,
        email: person.email,
        phone: person.phone,
        photo_url: person.photo_url,
        summary: person.summary,
        resume_url: person.resume_url,
        template: person.template,
        skills: person.skills || [],
        achievements: person.achievements || [],
        hobbies: person.hobbies || [],
        experience: person.experience || [],
        education: person.education || [],
        day_plan: person.day_plan || {},
        case_study: person.case_study || {},
        created_date: person.created_date,
        updated_date: person.updated_date,
        created_by: person.created_by,
        portfolio_url: window.location.href,
      };

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      toast.success(`Portfolio sent to Zapier!`);
    } catch (error) {
      console.error('Zapier error:', error);
      toast.error('Failed to send to Zapier');
    }
    setSendingToZapier(false);
  };

  const isDark = variant === "dark";
  const isBlue = variant === "blue";
  const isLight = variant === "light";
  const isGradient = variant === "gradient";

  const bgClass = isDark 
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    : isBlue 
    ? "bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900"
    : isGradient
    ? "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
    : "bg-gradient-to-br from-slate-100 to-white";

  const textClass = isLight ? "text-slate-900" : "text-white";
  const subtextClass = isLight ? "text-slate-600" : isDark ? "text-slate-300" : "text-white/80";
  const accentColor = isDark ? "from-amber-400 to-amber-600" : isBlue ? "from-yellow-400 to-yellow-500" : isGradient ? "from-white to-slate-100" : "from-slate-800 to-slate-900";
  const accentTextColor = isDark || isBlue ? "text-slate-900" : isGradient ? "text-purple-600" : "text-white";

  return (
    <section className={`min-h-screen ${bgClass} flex items-center justify-center relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-current rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-current rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 px-6"
      >
        {/* Thank You Icon */}
        <div className={`w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-2xl`}>
          <Award className={`w-12 h-12 ${accentTextColor}`} />
        </div>

        {/* Thank You Message */}
        <h2 className={`text-4xl md:text-6xl font-bold ${textClass} mb-4`}>
          Thank You
        </h2>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`w-12 h-0.5 ${isDark ? 'bg-amber-500' : isBlue ? 'bg-yellow-400' : isGradient ? 'bg-white' : 'bg-slate-800'}`} />
          <span className={`${isDark ? 'text-amber-400' : isBlue ? 'text-yellow-400' : isGradient ? 'text-white' : 'text-slate-600'} font-medium tracking-widest uppercase text-sm`}>
            For Your Time
          </span>
          <div className={`w-12 h-0.5 ${isDark ? 'bg-amber-500' : isBlue ? 'bg-yellow-400' : isGradient ? 'bg-white' : 'bg-slate-800'}`} />
        </div>

        <p className={`text-xl ${subtextClass} mb-8 max-w-2xl mx-auto leading-relaxed`}>
          I appreciate you taking the time to review my portfolio. I'm excited about the opportunity to bring my experience and results-driven approach to your team.
        </p>

        <p className={`text-lg ${subtextClass} mb-12`}>
          — {person.full_name}
        </p>

        {/* Contact CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {person.email && (
            <a href={`mailto:${person.email}`}>
              <Button 
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${accentColor} ${accentTextColor} px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all`}
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </Button>
            </a>
          )}
          {person.resume_url && (
            <a 
              href={person.resume_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline"
                className={`inline-flex items-center gap-2 border-2 ${isDark ? 'border-amber-500 text-amber-400 hover:bg-amber-500/10' : isBlue ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10' : isGradient ? 'border-white text-white hover:bg-white/10' : 'border-slate-800 text-slate-800 hover:bg-slate-800/10'} px-8 py-4 rounded-xl font-semibold transition-all`}
              >
                <Briefcase className="w-5 h-5" />
                Download Resume
              </Button>
            </a>
          )}
          <a 
            href={`/PortfolioSummary?id=${new URLSearchParams(window.location.search).get('id')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline"
              className={`inline-flex items-center gap-2 border-2 ${isDark ? 'border-amber-500 text-amber-400 hover:bg-amber-500/10' : isBlue ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10' : isGradient ? 'border-white text-white hover:bg-white/10' : 'border-slate-800 text-slate-800 hover:bg-slate-800/10'} px-8 py-4 rounded-xl font-semibold transition-all`}
            >
              <FileDown className="w-5 h-5" />
              Download Portfolio
            </Button>
          </a>
          <Button 
            variant="outline"
            onClick={handleSendToZapier}
            disabled={sendingToZapier}
            className={`inline-flex items-center gap-2 border-2 ${isDark ? 'border-amber-500 text-amber-400 hover:bg-amber-500/10' : isBlue ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10' : isGradient ? 'border-white text-white hover:bg-white/10' : 'border-slate-800 text-slate-800 hover:bg-slate-800/10'} px-8 py-4 rounded-xl font-semibold transition-all`}
          >
            {sendingToZapier ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Send to Zapier
          </Button>
        </div>
      </motion.div>
    </section>
  );
}