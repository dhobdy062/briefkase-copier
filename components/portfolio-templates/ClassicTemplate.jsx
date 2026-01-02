import React from "react";
import { Mail, Phone, Award, Briefcase, GraduationCap, MapPin, Globe, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function ClassicTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-white shadow-lg hover:shadow-xl rounded-lg border border-slate-300"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-blue-700 px-12 py-16 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={person.photo_url}
                  alt={person.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-3">{person.full_name}</h1>
                <p className="text-2xl text-blue-200 font-semibold mb-4">{person.title}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-blue-100 hover:text-white">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{person.email}</span>
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone}`} className="flex items-center gap-2 text-blue-100 hover:text-white">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{person.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-12">
            {/* Professional Summary */}
            {person.summary && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-10 pb-10 border-b-2 border-slate-200"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-wide">Professional Summary</h2>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {person.summary}
                </p>
              </motion.section>
            )}

            {/* Skills */}
            {person.skills && person.skills.length > 0 && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-10 pb-10 border-b-2 border-slate-200"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  Core Competencies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {person.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-slate-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Professional Experience */}
            {person.experience && person.experience.length > 0 && (
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-10 pb-10 border-b-2 border-slate-200"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase tracking-wide flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {person.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                          <p className="text-lg text-blue-700 font-semibold">{exp.company}</p>
                        </div>
                        <span className="text-slate-600 font-medium whitespace-nowrap ml-4">{exp.duration}</span>
                      </div>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-700">
                              <span className="text-blue-600 font-bold mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <div className="grid md:grid-cols-2 gap-10">
              {/* Achievements */}
              {person.achievements && person.achievements.length > 0 && (
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-wide">Achievements & Awards</h2>
                  <ul className="space-y-3">
                    {person.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-slate-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {/* Education */}
              {person.education && person.education.length > 0 && (
                <motion.section
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-wide">Education</h2>
                  <div className="space-y-4">
                    {person.education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-blue-700 font-semibold">{edu.institution}</p>
                        <p className="text-slate-600">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          </div>
        </motion.div>

        {/* Thank You Section */}
        <ThankYouSection person={person} variant="light" />
      </div>
    </div>
  );
}