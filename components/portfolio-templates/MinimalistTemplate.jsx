import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Palette } from "lucide-react";
import ThankYouSection from "../portfolio/ThankYouSection";

export default function MinimalistTemplate({ person, onChangeTemplate }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Change Template Button */}
      <Button
        onClick={onChangeTemplate}
        className="fixed top-8 right-8 z-50 bg-black text-white hover:bg-gray-800"
      >
        <Palette className="w-4 h-4 mr-2" />
        Change Template
      </Button>

      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          {person.photo_url && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8 grayscale">
              <img src={person.photo_url} alt={person.full_name} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-7xl font-light text-black mb-4 tracking-tight leading-none">
            {person.full_name}
          </h1>
          <p className="text-2xl text-gray-600 font-light mb-12">{person.title}</p>
          
          <div className="max-w-2xl">
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {person.summary}
            </p>
          </div>

          <div className="flex gap-6 mt-12">
            {person.email && (
              <a href={`mailto:${person.email}`} className="text-black hover:text-gray-600 transition-colors underline decoration-1 underline-offset-4">
                {person.email}
              </a>
            )}
            {person.phone && (
              <a href={`tel:${person.phone}`} className="text-black hover:text-gray-600 transition-colors underline decoration-1 underline-offset-4">
                {person.phone}
              </a>
            )}
          </div>
        </motion.section>

        {/* Achievements */}
        {person.achievements && person.achievements.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-12 font-medium">Achievements</h2>
            <div className="space-y-8">
              {person.achievements.map((achievement, i) => (
                <div key={i} className="border-l-2 border-black pl-8">
                  <p className="text-xl text-gray-800 font-light leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 30-60-90 Day Plan */}
        {person.day_plan && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-12 font-medium">30-60-90 Day Plan</h2>
            <div className="space-y-16">
              {[
                { data: person.day_plan.day_30, label: "First 30 Days" },
                { data: person.day_plan.day_60, label: "By Day 60" },
                { data: person.day_plan.day_90, label: "At 90 Days" }
              ].map((plan, i) => plan.data && (
                <div key={i} className="border-t border-gray-200 pt-8">
                  <h3 className="text-3xl font-light text-black mb-2">{plan.label}</h3>
                  <p className="text-lg text-gray-600 mb-6 font-light">{plan.data.subtitle}</p>
                  <ul className="space-y-3">
                    {plan.data.items?.map((item, j) => (
                      <li key={j} className="text-gray-700 font-light leading-relaxed pl-6 relative before:content-['—'] before:absolute before:left-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience */}
        {person.experience && person.experience.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-12 font-medium">Experience</h2>
            <div className="space-y-16">
              {person.experience.map((exp, i) => (
                <div key={i}>
                  <h3 className="text-3xl font-light text-black mb-2">{exp.position}</h3>
                  <p className="text-lg text-gray-600 mb-6 font-light">{exp.company} • {exp.duration}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j} className="text-gray-700 font-light leading-relaxed pl-6 relative before:content-['—'] before:absolute before:left-0">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {person.skills && person.skills.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-12 font-medium">Skills</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {person.skills.map((skill, i) => (
                <span key={i} className="text-xl text-gray-800 font-light">
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        {person.education && person.education.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-12 font-medium">Education</h2>
            <div className="space-y-8">
              {person.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-2xl font-light text-black mb-1">{edu.degree}</h3>
                  <p className="text-lg text-gray-600 font-light">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Thank You Section */}
        <ThankYouSection person={person} variant="light" />
      </div>
    </div>
  );
}