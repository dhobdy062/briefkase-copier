import React from "react";
import { Mail, Phone, Award, Briefcase, GraduationCap, Target, ExternalLink, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function ExecutiveTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 rounded-xl shadow-lg"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-20 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-400/20">
                <img
                  src={person.photo_url}
                  alt={person.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Award className="w-12 h-12 text-slate-900" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {person.full_name}
              </h1>
              <p className="text-2xl text-amber-400 font-semibold mb-6">
                {person.title}
              </p>
              {person.summary && (
                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  {person.summary}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {person.email && (
                  <a href={`mailto:${person.email}`}>
                    <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-6">
                      <Mail className="w-4 h-4 mr-2" />
                      {person.email}
                    </Button>
                  </a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone}`}>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl px-6">
                      <Phone className="w-4 h-4 mr-2" />
                      {person.phone}
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Skills */}
          {person.skills && person.skills.length > 0 && (
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <Target className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900">Core Competencies</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {person.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-medium text-lg hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Experience */}
          {person.experience && person.experience.length > 0 && (
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900">Experience</h2>
              </div>
              <div className="space-y-8">
                {person.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-amber-400 pl-8 py-4"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{exp.position}</h3>
                    <p className="text-xl text-slate-600 mb-1">{exp.company}</p>
                    <p className="text-slate-500 mb-4">{exp.duration}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Achievements */}
          {person.achievements && person.achievements.length > 0 && (
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900">Notable Achievements</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {person.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-amber-50 p-6 rounded-2xl border border-amber-200"
                  >
                    <p className="text-slate-800 text-lg">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education */}
          {person.education && person.education.length > 0 && (
            <motion.section
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900">Education</h2>
              </div>
              <div className="space-y-4">
                {person.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 p-6 rounded-2xl"
                  >
                    <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution}</p>
                    <p className="text-slate-500">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Thank You Section */}
      <ThankYouSection person={person} variant="dark" />
    </div>
  );
}