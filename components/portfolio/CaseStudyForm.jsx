import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { X, Plus, Trash2, Save, BookOpen } from "lucide-react";

export default function CaseStudyForm({ caseStudy, onSave, onClose }) {
  const [formData, setFormData] = useState(caseStudy || {
    headline: "",
    challenge: "",
    solution: "",
    role: "",
    actions: "",
    obstacles: "",
    metrics: "",
    impact: "",
    results: [
      { metric: "", label: "" },
      { metric: "", label: "" },
      { metric: "", label: "" },
      { metric: "", label: "" }
    ]
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResultChange = (index, field, value) => {
    setFormData(prev => {
      const newResults = [...prev.results];
      newResults[index] = { ...newResults[index], [field]: value };
      return { ...prev, results: newResults };
    });
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: "", label: "" }]
    }));
  };

  const removeResult = (index) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Edit Case Study</h2>
              <p className="text-slate-500 text-sm">Tell the story of your biggest win</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Case Study Headline */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Case Study Headline
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              value={formData.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
              placeholder="e.g., Closed $2.4M Enterprise Deal in 6 Months"
              className="h-12 font-semibold"
              required
            />
            <p className="text-xs text-slate-500 mt-1">A compelling headline that summarizes your win</p>
          </div>

          {/* Client Challenge */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What was the client's main challenge or goal?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.challenge}
              onChange={(e) => handleChange("challenge", e.target.value)}
              placeholder="Describe the problem or goal the client was trying to solve..."
              className="min-h-[80px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Enterprise client struggling with legacy system migration, causing 40% productivity loss across 500+ users."</p>
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What product or solution did you sell?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.solution}
              onChange={(e) => handleChange("solution", e.target.value)}
              placeholder="Describe the solution you provided..."
              className="min-h-[80px]"
              required
            />
          </div>

          {/* Your Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What was your role in the sales process?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g., Lead Account Executive, Strategic AE, Sales Manager"
              className="h-12"
              required
            />
          </div>

          {/* Strategy & Actions */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What specific actions did you take to win this deal?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.actions}
              onChange={(e) => handleChange("actions", e.target.value)}
              placeholder="Describe your strategy and key actions..."
              className="min-h-[100px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Led discovery calls with 5 stakeholders, built custom ROI model, coordinated product demos..."</p>
          </div>

          {/* Obstacles */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What obstacles did you face and how did you overcome them?
            </label>
            <Textarea
              value={formData.obstacles}
              onChange={(e) => handleChange("obstacles", e.target.value)}
              placeholder="Describe challenges and how you navigated them..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Budget concerns from CFO — addressed with phased implementation plan and guaranteed ROI timeline."</p>
          </div>

          {/* Key Metrics */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What were the measurable results?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={formData.metrics}
              onChange={(e) => handleChange("metrics", e.target.value)}
              placeholder="List specific metrics and numbers..."
              className="min-h-[80px]"
              required
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "$2.4M contract value, 85% adoption rate, 3x ROI in first year"</p>
          </div>

          {/* Client Impact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What was the impact on the client?
            </label>
            <Textarea
              value={formData.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              placeholder="Describe the outcome for the client..."
              className="min-h-[80px]"
            />
            <p className="text-xs text-slate-500 mt-1">e.g., "Reduced manual processes by 60%, enabling team to focus on strategic initiatives."</p>
          </div>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Key Results & Metrics
                </label>
                <p className="text-xs text-slate-500">Add 3-4 impactful metrics that showcase your success</p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addResult}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Metric
              </Button>
            </div>
            
            <div className="grid gap-3">
              {formData.results.map((result, index) => (
                <Card key={index} className="p-4 border border-slate-200">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Input
                        value={result.metric}
                        onChange={(e) => handleResultChange(index, "metric", e.target.value)}
                        placeholder="e.g., $2.4M, 85%, 3x"
                        className="mb-2 font-bold"
                      />
                      <Input
                        value={result.label}
                        onChange={(e) => handleResultChange(index, "label", e.target.value)}
                        placeholder="e.g., Contract Value, Adoption Rate, ROI Achieved"
                        className="text-sm"
                      />
                    </div>
                    {formData.results.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResult(index)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <h4 className="text-amber-400 font-semibold text-sm mb-2">WIN SUMMARY</h4>
            <h3 className="text-white text-xl font-bold mb-4">{formData.headline || "Your Case Study Headline"}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.results.filter(r => r.metric || r.label).map((result, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{result.metric || "—"}</div>
                  <div className="text-slate-400 text-sm">{result.label || "Label"}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Case Study
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}