import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Mail, Phone, FileText, Award, Briefcase, GraduationCap, Target, Heart } from "lucide-react";

export default function PaginatedTemplate({ person, onChangeTemplate }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      id: 'hero',
      title: 'About',
      icon: Briefcase,
      render: () => (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-3xl"
          >
            <div className="w-48 h-48 rounded-full mx-auto mb-8 overflow-hidden border-8 border-white shadow-2xl">
              <img src={person.photo_url} alt={person.full_name} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4">{person.full_name}</h1>
            <p className="text-3xl text-white/90 mb-8">{person.title}</p>
            <p className="text-xl text-white/80 leading-relaxed mb-12">{person.summary}</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-white/90 rounded-full px-8 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                {person.email}
              </Button>
              <Button className="bg-white/20 backdrop-blur text-white hover:bg-white/30 rounded-full px-8 py-6 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                {person.phone}
              </Button>
            </div>
          </motion.div>
        </div>
      )
    },
    ...(person.achievements && person.achievements.length > 0 ? [{
      id: 'achievements',
      title: 'Achievements',
      icon: Award,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="max-w-5xl w-full">
            <h2 className="text-6xl font-bold text-white mb-16 text-center">Key Achievements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {person.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-slate-900" />
                    </div>
                    <p className="text-2xl text-white leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }] : []),
    ...(person.day_plan ? [{
      id: 'day_plan',
      title: '30-60-90 Plan',
      icon: Target,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <h2 className="text-6xl font-bold text-white mb-16 text-center">30-60-90 Day Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { data: person.day_plan.day_30, number: '30' },
                { data: person.day_plan.day_60, number: '60' },
                { data: person.day_plan.day_90, number: '90' }
              ].map((plan, i) => plan.data && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl"
                >
                  <div className="w-32 h-32 rounded-full bg-slate-700 text-white flex items-center justify-center text-5xl font-bold mx-auto mb-6">
                    {plan.number}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center uppercase">
                    {plan.data.title}
                  </h3>
                  <p className="text-slate-600 italic mb-6 text-center">
                    {plan.data.subtitle}
                  </p>
                  <ul className="space-y-3">
                    {plan.data.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }] : []),
    ...(person.experience && person.experience.length > 0 ? [{
      id: 'experience',
      title: 'Experience',
      icon: Briefcase,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
          <div className="max-w-5xl w-full">
            <h2 className="text-6xl font-bold text-white mb-16 text-center">Experience</h2>
            <div className="space-y-8">
              {person.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{exp.position}</h3>
                  <p className="text-xl text-emerald-600 font-semibold mb-1">{exp.company}</p>
                  <p className="text-slate-600 mb-6">{exp.duration}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-700">
                          <span className="text-emerald-600 mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }] : []),
    ...(person.skills && person.skills.length > 0 ? [{
      id: 'skills',
      title: 'Skills',
      icon: Award,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <div className="max-w-5xl w-full">
            <h2 className="text-6xl font-bold text-white mb-16 text-center">Core Skills</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {person.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl px-8 py-6 shadow-xl"
                >
                  <span className="text-2xl font-semibold text-slate-900">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }] : []),
    ...(person.education && person.education.length > 0 ? [{
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <h2 className="text-6xl font-bold text-white mb-16 text-center">Education</h2>
            <div className="space-y-6">
              {person.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{edu.degree}</h3>
                  <p className="text-xl text-violet-600 font-semibold mb-1">{edu.institution}</p>
                  <p className="text-slate-600">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    }] : []),
    // Thank You Page
    {
      id: 'thank_you',
      title: 'Thank You',
      icon: Heart,
      render: () => (
        <div className="min-h-screen p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-4">Thank You</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-indigo-500" />
              <span className="text-indigo-400 font-medium tracking-widest uppercase text-sm">For Your Time</span>
              <div className="w-12 h-0.5 bg-indigo-500" />
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I appreciate you taking the time to review my portfolio. I'm excited about the opportunity to bring my experience and results-driven approach to your team.
            </p>
            <p className="text-lg text-slate-400 mb-12">— {person.full_name}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {person.email && (
                <a href={`mailto:${person.email}`}>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </Button>
                </a>
              )}
              {person.resume_url && (
                <a href={person.resume_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-8 py-4 rounded-full font-semibold">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Change Template Button */}
      <Button
        onClick={onChangeTemplate}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 rounded-full shadow-xl px-6"
      >
        Change Template
      </Button>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        >
          {pages[currentPage].render()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-full shadow-2xl px-6 py-4 flex items-center gap-6">
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="ghost"
            size="icon"
            className="rounded-full disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex gap-2">
            {pages.map((page, i) => {
              const Icon = page.icon;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentPage === i
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-110'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  title={page.title}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            variant="ghost"
            size="icon"
            className="rounded-full disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Page Counter */}
      <div className="fixed top-6 left-6 z-50">
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full px-6 py-3 font-semibold">
          {currentPage + 1} / {pages.length}
        </div>
      </div>
    </div>
  );
}