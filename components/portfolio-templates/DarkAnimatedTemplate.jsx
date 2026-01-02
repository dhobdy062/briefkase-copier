import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Palette, Sparkles } from "lucide-react";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function DarkAnimatedTemplate({ person, onChangeTemplate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Change Template Button */}
      <Button
        onClick={onChangeTemplate}
        className="fixed top-8 right-8 z-50 bg-white/10 backdrop-blur text-white hover:bg-white/20 border border-white/20"
      >
        <Palette className="w-4 h-4 mr-2" />
        Change Template
      </Button>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-40"
        >
          <div className="flex items-center gap-8 mb-12">
            {person.photo_url && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-cyan-400/30"
              >
                <img src={person.photo_url} alt={person.full_name} className="w-full h-full object-cover" />
              </motion.div>
            )}
            <div className="flex-1">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 uppercase tracking-wider text-sm">Sales Professional</span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
                {person.full_name}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-3xl text-gray-300">
                {person.title}
              </motion.p>
            </div>
          </div>

          <motion.div variants={itemVariants} className="max-w-3xl mb-8">
            <p className="text-xl text-gray-300 leading-relaxed">{person.summary}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </a>
            )}
            {person.phone && (
              <a href={`tel:${person.phone}`}>
                <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Me
                </Button>
              </a>
            )}
          </motion.div>
        </motion.section>

        {/* Achievements */}
        {person.achievements && person.achievements.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-40"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-16 text-cyan-400">
              Key Achievements
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {person.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
                >
                  <p className="text-lg text-gray-200">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 30-60-90 Day Plan */}
        {person.day_plan && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-40"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-16 text-cyan-400">
              30-60-90 Day Plan
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { data: person.day_plan.day_30, color: "cyan" },
                { data: person.day_plan.day_60, color: "blue" },
                { data: person.day_plan.day_90, color: "purple" }
              ].map((plan, i) => plan.data && (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br from-${plan.color}-500/20 to-${plan.color}-700/20 backdrop-blur border border-${plan.color}-400/30 rounded-2xl p-8`}
                >
                  <h3 className={`text-4xl font-bold text-${plan.color}-400 mb-4`}>
                    {plan.data.title}
                  </h3>
                  <p className="text-gray-300 mb-6 italic">{plan.data.subtitle}</p>
                  <ul className="space-y-2">
                    {plan.data.items?.map((item, j) => (
                      <li key={j} className="text-gray-200 flex items-start gap-2">
                        <span className={`text-${plan.color}-400 mt-1`}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience */}
        {person.experience && person.experience.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-40"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-16 text-cyan-400">
              Experience
            </motion.h2>
            <div className="space-y-8">
              {person.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-cyan-400/50 transition-all"
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{exp.position}</h3>
                  <p className="text-xl text-cyan-400 mb-4">{exp.company} • {exp.duration}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">→</span>
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

        {/* Skills */}
        {person.skills && person.skills.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-40"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-16 text-cyan-400">
              Skills
            </motion.h2>
            <div className="flex flex-wrap gap-4">
              {person.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur border border-cyan-400/30 rounded-full px-6 py-3"
                >
                  <span className="text-white font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        {person.education && person.education.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-40"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-16 text-cyan-400">
              Education
            </motion.h2>
            <div className="space-y-6">
              {person.education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-xl text-gray-300">{edu.institution} • {edu.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Thank You Section */}
        <ThankYouSection person={person} variant="dark" />
      </div>
    </div>
  );
}