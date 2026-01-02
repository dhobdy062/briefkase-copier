import React from "react";
import { Mail, Phone, Award, Briefcase, GraduationCap, Target, Zap, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function BoldTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-red-600 hover:bg-red-700 text-white rounded-none shadow-2xl font-black"
        >
          <Palette className="w-4 h-4 mr-2" />
          CHANGE
        </Button>
      </motion.div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-red-600 transform rotate-3" />
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={person.photo_url}
                    alt={person.full_name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-red-600 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-block bg-red-600 px-6 py-2 mb-4">
                    <p className="text-xl font-black uppercase tracking-wider">{person.title}</p>
                  </div>
                </motion.div>
                
                <motion.h1
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-7xl md:text-8xl font-black uppercase leading-none"
                  style={{ lineHeight: 0.9 }}
                >
                  {person.full_name.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </motion.h1>

                {person.summary && (
                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-slate-300 leading-relaxed border-l-4 border-red-600 pl-6"
                  >
                    {person.summary}
                  </motion.p>
                )}

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  {person.email && (
                    <a href={`mailto:${person.email}`}>
                      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-none px-8 py-6 font-black text-lg">
                        <Mail className="w-5 h-5 mr-2" />
                        CONTACT
                      </Button>
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone}`}>
                      <Button className="bg-white text-black hover:bg-slate-200 rounded-none px-8 py-6 font-black text-lg">
                        <Phone className="w-5 h-5 mr-2" />
                        CALL
                      </Button>
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {person.skills && person.skills.length > 0 && (
        <div className="bg-white text-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-red-600 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-6xl font-black uppercase">Skills</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {person.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black text-white p-6 text-center font-black text-lg uppercase border-4 border-black hover:border-red-600 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      {person.experience && person.experience.length > 0 && (
        <div className="bg-red-600 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-black flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-6xl font-black uppercase text-white">Experience</h2>
              </div>
              <div className="space-y-12">
                {person.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black p-8"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-black uppercase mb-2">{exp.position}</h3>
                        <p className="text-xl font-bold text-red-300">{exp.company}</p>
                      </div>
                      <span className="text-slate-400 font-bold mt-2 md:mt-0">{exp.duration}</span>
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-3 mt-6">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 mt-2 flex-shrink-0" />
                            <span className="text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Achievements */}
            {person.achievements && person.achievements.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-black uppercase">Achievements</h2>
                </div>
                <div className="space-y-4">
                  {person.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-4 border-red-600 pl-6 py-3"
                    >
                      <p className="font-bold">{achievement}</p>
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
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-black flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-black uppercase">Education</h2>
                </div>
                <div className="space-y-6">
                  {person.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black text-white p-6"
                    >
                      <h3 className="font-black uppercase text-lg">{edu.degree}</h3>
                      <p className="text-red-400 font-bold">{edu.institution}</p>
                      <p className="text-slate-400">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <ThankYouSection person={person} variant="dark" />
    </div>
  );
}