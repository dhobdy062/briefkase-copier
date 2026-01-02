import React from "react";
import { Mail, Phone, Award, Briefcase, GraduationCap, Target, ExternalLink, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function ModernTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-white shadow-lg hover:shadow-xl rounded-xl border border-slate-200"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-12 mb-12 bg-white/80 backdrop-blur-xl shadow-2xl border-none">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="w-56 h-56 rounded-full overflow-hidden shadow-xl ring-8 ring-blue-500/20">
                  <img
                    src={person.photo_url}
                    alt={person.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {person.full_name}
                </h1>
                <p className="text-2xl text-slate-700 font-semibold mb-6">
                  {person.title}
                </p>
                {person.summary && (
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {person.summary}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {person.email && (
                    <a href={`mailto:${person.email}`}>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-6">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Me
                      </Button>
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone}`}>
                      <Button variant="outline" className="rounded-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Me
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills */}
        {person.skills && person.skills.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-xl shadow-xl border-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {person.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-800 rounded-full font-medium border-2 border-blue-200/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Experience */}
        {person.experience && person.experience.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-xl shadow-xl border-none">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Experience</h2>
              </div>
              <div className="space-y-6">
                {person.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-purple-500 pl-6 py-2"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.position}</h3>
                    <p className="text-lg text-purple-600 font-semibold mb-1">{exp.company}</p>
                    <p className="text-slate-500 mb-3">{exp.duration}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Achievements */}
          {person.achievements && person.achievements.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-xl shadow-xl border-none h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
                </div>
                <div className="space-y-3">
                  {person.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-xl border border-pink-200"
                    >
                      <p className="text-slate-800">{achievement}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Education */}
          {person.education && person.education.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-xl shadow-xl border-none h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                </div>
                <div className="space-y-4">
                  {person.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200"
                    >
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      <p className="text-slate-500 text-sm">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Thank You Section */}
        <ThankYouSection person={person} variant="gradient" />
      </div>
    </div>
  );
}