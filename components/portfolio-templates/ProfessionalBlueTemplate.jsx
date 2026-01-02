import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Palette, Award, Target, TrendingUp } from "lucide-react";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function ProfessionalBlueTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Change Template Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 right-6 z-50"
      >
        <Button
          onClick={onChangeTemplate}
          className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg border-2 border-blue-700"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </motion.div>

      {/* About Me Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold mb-12 tracking-tight"
          >
            ABOUT ME
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {person.photo_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={person.photo_url}
                  alt={person.full_name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">{person.full_name}</h2>
              <p className="text-2xl text-blue-200">{person.title}</p>
              <p className="text-xl leading-relaxed text-blue-100">
                {person.summary}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {person.email && (
                  <a href={`mailto:${person.email}`}>
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Me
                    </Button>
                  </a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone}`}>
                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Me
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accomplishments Section */}
      {person.achievements && person.achievements.length > 0 && (
        <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-16 text-center"
            >
              Accomplishments
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {person.achievements.slice(0, 3).map((achievement, idx) => {
                // Extract any numbers or percentages from the achievement text
                const match = achievement.match(/(\+?\d+\.?\d*%?|\d+\s*(?:years|yrs|MM|million))/i);
                const stat = match ? match[0] : `#${idx + 1}`;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative overflow-hidden rounded-xl bg-slate-400/20"
                  >
                    {/* City skyline background */}
                    <div 
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 400%22%3E%3Cpath fill=%22%23334155%22 d=%22M0 300h50v100H0zm60 -50h40v150H60zm110 -40h45v190h-45zm55 20h50v170h-50zm60 -60h40v230h-40zm50 40h55v190h-55zm65 -30h45v220h-45zm55 50h40v170h-40zm50 -70h50v240h-50zm60 30h45v210h-45zm55 -20h40v230h-40zm50 40h55v190h-55z%22/%3E%3C/svg%3E')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative p-8 text-center">
                      <div className="text-6xl md:text-7xl font-black text-yellow-400 mb-6">
                        {stat}
                      </div>
                      <p className="text-lg leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 30-60-90 Day Plan */}
      {person.day_plan && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-12 px-6 rounded-t-3xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-center">
                30-60-90 DAY PLAN
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 -mt-6">
              {/* 30 Days */}
              {person.day_plan.day_30 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="w-40 h-40 rounded-full bg-slate-600 text-white flex items-center justify-center text-6xl font-bold mx-auto mb-6">
                    30
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-1 text-center uppercase">
                    {person.day_plan.day_30.title || "The First 30 Days"}
                  </h3>
                  <p className="text-slate-600 italic mb-6 text-center">
                    {person.day_plan.day_30.subtitle || "Preparations"}
                  </p>
                  
                  {person.day_plan.day_30.items && person.day_plan.day_30.items.length > 0 && (
                    <ul className="space-y-2 text-slate-700">
                      {person.day_plan.day_30.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-800 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              {/* 60 Days */}
              {person.day_plan.day_60 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="w-40 h-40 rounded-full bg-slate-600 text-white flex items-center justify-center text-6xl font-bold mx-auto mb-6">
                    60
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-1 text-center uppercase">
                    {person.day_plan.day_60.title || "At 60 Days"}
                  </h3>
                  <p className="text-slate-600 italic mb-6 text-center">
                    {person.day_plan.day_60.subtitle || "Finalization"}
                  </p>
                  
                  {person.day_plan.day_60.items && person.day_plan.day_60.items.length > 0 && (
                    <ul className="space-y-2 text-slate-700">
                      {person.day_plan.day_60.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-800 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              {/* 90 Days */}
              {person.day_plan.day_90 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="w-40 h-40 rounded-full bg-slate-600 text-white flex items-center justify-center text-6xl font-bold mx-auto mb-6">
                    90
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-1 text-center uppercase">
                    {person.day_plan.day_90.title || "At 90 Days"}
                  </h3>
                  <p className="text-slate-600 italic mb-6 text-center">
                    {person.day_plan.day_90.subtitle || "Launch"}
                  </p>
                  
                  {person.day_plan.day_90.items && person.day_plan.day_90.items.length > 0 && (
                    <ul className="space-y-2 text-slate-700">
                      {person.day_plan.day_90.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-800 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section - 30-60-90 Day Style */}
      {person.experience && person.experience.length > 0 && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white py-12 px-6 rounded-t-3xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-center">
                EXPERIENCE
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 -mt-6">
              {person.experience.slice(0, 3).map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="w-32 h-32 rounded-full bg-slate-600 text-white flex items-center justify-center text-5xl font-bold mx-auto mb-6">
                    {idx + 1}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                    {exp.position}
                  </h3>
                  <p className="text-slate-600 italic mb-4 text-center">
                    {exp.company}
                  </p>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 text-slate-700">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-700 mt-1">•</span>
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
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-12 text-slate-900 text-center"
            >
              Core Competencies
            </motion.h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              {person.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-xl p-6 text-center font-semibold text-lg shadow-lg"
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
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-12 text-slate-900 text-center"
            >
              Education
            </motion.h2>
            
            <div className="space-y-6">
              {person.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xl text-slate-600">
                    {edu.institution} • {edu.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Thank You Section */}
      <ThankYouSection person={person} variant="blue" />
    </div>
  );
}