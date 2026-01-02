import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

const templates = [
  {
    id: 'briefkase_premium',
    name: 'Briefkase Premium',
    description: 'Full sales portfolio',
    colors: ['bg-slate-900', 'bg-amber-500']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Dark & professional',
    colors: ['bg-slate-900', 'bg-amber-400']
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean & minimalist',
    colors: ['bg-white', 'bg-blue-500']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold & artistic',
    colors: ['bg-gradient-to-br from-pink-500 to-purple-500', 'bg-orange-400']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional & timeless',
    colors: ['bg-slate-100', 'bg-blue-600']
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'High contrast',
    colors: ['bg-black', 'bg-red-500']
  },
  {
    id: 'professional_blue',
    name: 'Professional Blue',
    description: 'Bold royal blue',
    colors: ['bg-blue-700', 'bg-yellow-400']
  },
  {
    id: 'paginated',
    name: 'Paginated',
    description: 'Separate pages',
    colors: ['bg-gradient-to-br from-indigo-600 to-purple-600', 'bg-white']
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean typography',
    colors: ['bg-white', 'bg-black']
  },
  {
    id: 'dark_animated',
    name: 'Dark Animated',
    description: 'Dark with animations',
    colors: ['bg-gradient-to-br from-gray-900 to-cyan-500', 'bg-cyan-400']
  },
  {
    id: 'video_background',
    name: 'Video Background',
    description: 'Dynamic video',
    colors: ['bg-black', 'bg-gradient-to-br from-purple-600 to-blue-600']
  }
];

export default function TemplateSwitcher({ currentTemplate, onSelect, onClose, person }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Change Template</h2>
              <p className="text-slate-600">Select a new design for your portfolio</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                onClick={() => onSelect(template.id)}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                  currentTemplate === template.id
                    ? 'ring-4 ring-slate-900 shadow-xl'
                    : ''
                }`}
              >
                {currentTemplate === template.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="h-32 rounded-lg overflow-hidden mb-3 border border-slate-200">
                  <div className="h-2/3 flex">
                    <div className={`flex-1 ${template.colors[0]}`} />
                  </div>
                  <div className="h-1/3 flex">
                    <div className={`flex-1 ${template.colors[1]}`} />
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
                <p className="text-sm text-slate-600">{template.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}