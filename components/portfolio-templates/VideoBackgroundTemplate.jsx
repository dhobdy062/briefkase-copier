import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Palette, Award, Briefcase } from "lucide-react";

export default function VideoBackgroundTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover opacity-30"
        >
          <source src="https://cdn.coverr.co/videos/coverr-abstract-gradient-flow-6511/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      {/* Change Template Button */}
      <Button
        onClick={onChangeTemplate}
        className="fixed top-8 right-8 z-50 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 border border-white/30"
      >
        <Palette className="w-4 h-4 mr-2" />
        Change Template
      </Button>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl"
          >
            {person.photo_url && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-56 h-56 rounded-full mx-auto mb-12 overflow-hidden ring-8 ring-white/20 shadow-2xl"
              >
                <img src={person.photo_url} alt={person.full_name} className="w-full h-full object-cover" />
              </motion.div>
            )}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent"
            >
              {person.full_name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-4xl text-white/90 mb-8 font-light"
            >
              {person.title}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-2xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              {person.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex gap-6 justify-center"
            >
              {person.email && (
                <a href={`mailto:${person.email}`}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </Button>
                </a>
              )}
              {person.phone && (
                <a href={`tel:${person.phone}`}>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    {person.phone}
                  </Button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Achievements Section */}
        {person.achievements && person.achievements.length > 0 && (
          <section className="min-h-screen flex items-center justify-center px-8 py-20">
            <div className="max-w-6xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20 text-white"
              >
                Key Achievements
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {person.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
                  >
                    <p className="text-2xl text-white leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 30-60-90 Day Plan */}
        {person.day_plan && (
          <section className="min-h-screen flex items-center justify-center px-8 py-20">
            <div className="max-w-6xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20 text-white"
              >
                30-60-90 Day Plan
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { data: person.day_plan.day_30, num: "30" },
                  { data: person.day_plan.day_60, num: "60" },
                  { data: person.day_plan.day_90, num: "90" }
                ].map((plan, i) => plan.data && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
                  >
                    <div className="text-7xl font-bold text-white/30 mb-4">{plan.num}</div>
                    <h3 className="text-3xl font-bold text-white mb-2">{plan.data.title}</h3>
                    <p className="text-white/70 mb-6 italic text-lg">{plan.data.subtitle}</p>
                    <ul className="space-y-3">
                      {plan.data.items?.map((item, j) => (
                        <li key={j} className="text-white/90 flex items-start gap-2">
                          <span className="text-white/50 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {person.experience && person.experience.length > 0 && (
          <section className="min-h-screen flex items-center justify-center px-8 py-20">
            <div className="max-w-5xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20 text-white"
              >
                Experience
              </motion.h2>
              <div className="space-y-8">
                {person.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10"
                  >
                    <h3 className="text-4xl font-bold text-white mb-3">{exp.position}</h3>
                    <p className="text-2xl text-white/70 mb-6">{exp.company} • {exp.duration}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, j) => (
                          <li key={j} className="text-white/90 flex items-start gap-3 text-lg">
                            <span className="text-white/50 mt-1">→</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {person.skills && person.skills.length > 0 && (
          <section className="min-h-screen flex items-center justify-center px-8 py-20">
            <div className="max-w-5xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20 text-white"
              >
                Skills & Expertise
              </motion.h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {person.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-8 py-4 text-white text-xl font-medium"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {person.education && person.education.length > 0 && (
          <section className="min-h-screen flex items-center justify-center px-8 py-20">
            <div className="max-w-4xl w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20 text-white"
              >
                Education
              </motion.h2>
              <div className="space-y-8">
                {person.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-3">{edu.degree}</h3>
                    <p className="text-2xl text-white/70">{edu.institution} • {edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Thank You Section */}
        <section className="min-h-screen flex items-center justify-center px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg flex items-center justify-center border border-white/30">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-4">Thank You</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-white/50" />
              <span className="text-white/70 font-medium tracking-widest uppercase text-sm">For Your Time</span>
              <div className="w-12 h-0.5 bg-white/50" />
            </div>
            <p className="text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              I appreciate you taking the time to review my portfolio. I'm excited about the opportunity to bring my experience and results-driven approach to your team.
            </p>
            <p className="text-xl text-white/60 mb-12">— {person.full_name}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {person.email && (
                <a href={`mailto:${person.email}`}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </Button>
                </a>
              )}
              {person.resume_url && (
                <a href={person.resume_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}