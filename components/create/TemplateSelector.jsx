import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const templates = [
  {
    id: 'briefkase_premium',
    name: 'Briefkase Premium',
    description: 'Full sales portfolio with dashboard & case studies',
    colors: ['bg-slate-900', 'bg-white', 'bg-amber-500'],
    preview: 'Cover, Dashboard, Deal Wins, Case Study, Skills, Contact'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Dark, sophisticated and professional',
    colors: ['bg-slate-900', 'bg-slate-800', 'bg-amber-400'],
    preview: 'Dark background with gold accents'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, bright and minimalist',
    colors: ['bg-white', 'bg-blue-500', 'bg-purple-500'],
    preview: 'White background with vibrant colors'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, artistic and unique',
    colors: ['bg-gradient-to-br from-pink-500', 'bg-gradient-to-br from-orange-500', 'bg-gradient-to-br from-purple-500'],
    preview: 'Colorful gradients and creative layouts'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and timeless',
    colors: ['bg-slate-100', 'bg-slate-700', 'bg-blue-600'],
    preview: 'Professional resume-style layout'
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High contrast and statement-making',
    colors: ['bg-black', 'bg-white', 'bg-red-500'],
    preview: 'Strong typography and bold colors'
  },
  {
    id: 'professional_blue',
    name: 'Professional Blue',
    description: 'Bold royal blue with clean sections',
    colors: ['bg-blue-700', 'bg-white', 'bg-yellow-400'],
    preview: 'Royal blue with structured layout'
  },
  {
    id: 'paginated',
    name: 'Paginated',
    description: 'Separate pages for each section',
    colors: ['bg-gradient-to-br from-indigo-600', 'bg-gradient-to-br from-emerald-600', 'bg-gradient-to-br from-orange-500'],
    preview: 'Navigate through different pages'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean typography and spacing',
    colors: ['bg-white', 'bg-gray-100', 'bg-black'],
    preview: 'Simple and elegant design'
  },
  {
    id: 'dark_animated',
    name: 'Dark Animated',
    description: 'Dark theme with subtle animations',
    colors: ['bg-gradient-to-br from-gray-900', 'bg-gradient-to-br from-cyan-500', 'bg-gradient-to-br from-blue-500'],
    preview: 'Dynamic dark design'
  },
  {
    id: 'video_background',
    name: 'Video Background',
    description: 'Dynamic video presentation',
    colors: ['bg-black', 'bg-gradient-to-br from-purple-500', 'bg-gradient-to-br from-blue-500'],
    preview: 'Cinematic video backdrop'
  }
];

export default function TemplateSelector({ selectedTemplate, onSelect, previewData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => onSelect(template.id)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                selectedTemplate === template.id
                  ? 'ring-4 ring-slate-900 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="relative">
                {selectedTemplate === template.id && (
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shadow-lg z-10">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
                
                {/* Template Preview */}
                <div className="h-48 rounded-xl overflow-hidden mb-4 border-2 border-slate-200">
                  <div className="h-full flex flex-col">
                    <div className={`h-1/2 ${template.colors[0]} flex items-center justify-center text-white font-bold text-lg`}>
                      {template.name}
                    </div>
                    <div className="h-1/2 flex">
                      <div className={`flex-1 ${template.colors[1]}`} />
                      <div className={`flex-1 ${template.colors[2]}`} />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-600 mb-3">{template.description}</p>
                <p className="text-sm text-slate-500">{template.preview}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-slate-600">
          You can change the template anytime from the portfolio page
        </p>
      </motion.div>
    </motion.div>
  );
}