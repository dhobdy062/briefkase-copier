import React from "react";
import { Mail, Phone, Award, Briefcase, GraduationCap, Target, ExternalLink, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function CreativeTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 -right-40 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-white text-purple-600 hover:bg-white/90 rounded-2xl shadow-2xl"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block relative mb-8"
          >
            <div className="w-64 h-64 rounded-[4rem] overflow-hidden shadow-2xl ring-8 ring-white/30 relative">
              <img
                src={person.photo_url}
                alt={person.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            {person.full_name}
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl text-white font-bold mb-8"
          >
            {person.title}
          </motion.p>
          {person.summary && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              {person.summary}
            </motion.p>
          )}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-2xl px-8 py-6 text-lg shadow-xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </a>
            )}
            {person.phone && (
              <a href={`tel:${person.phone}`}>
                <Button className="bg-white/10 backdrop-blur-md text-white border-2 border-white hover:bg-white/20 rounded-2xl px-8 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  {person.phone}
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* Skills */}
          {person.skills && person.skills.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-slate-900">My Superpowers</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {person.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, type: "spring" }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-110 transition-transform cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience */}
          {person.experience && person.experience.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-slate-900">My Journey</h2>
              </div>
              <div className="space-y-8">
                {person.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 border-l-4 border-gradient-to-b from-orange-500 to-pink-500"
                    style={{ borderImage: 'linear-gradient(to bottom, #f97316, #ec4899) 1' }}
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full" />
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{exp.position}</h3>
                    <p className="text-xl text-purple-600 font-bold mb-2">{exp.company}</p>
                    <p className="text-slate-600 mb-4">{exp.duration}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700">
                            <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Achievements */}
            {person.achievements && person.achievements.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Awards</h2>
                </div>
                <div className="space-y-4">
                  {person.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-2xl border-2 border-yellow-300"
                    >
                      <p className="text-slate-800 font-semibold">{achievement}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education */}
            {person.education && person.education.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Education</h2>
                </div>
                <div className="space-y-4">
                  {person.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-pink-100 to-purple-100 p-5 rounded-2xl border-2 border-pink-300"
                    >
                      <h3 className="font-black text-slate-900">{edu.degree}</h3>
                      <p className="text-purple-600 font-semibold">{edu.institution}</p>
                      <p className="text-slate-600">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Thank You Section */}
        <ThankYouSection person={person} variant="gradient" />
      </div>
    </div>
  );
}