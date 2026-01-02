import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, X, Plus, Trash2, BookOpen, Sparkles } from "lucide-react";
import { SummaryEnhancer, SkillsSuggester, DayPlanGenerator } from "./AIEnhancer";

export default function PortfolioPreview({ data, onSave, onBack, isSaving }) {
  const [editedData, setEditedData] = useState(data);

  const updateField = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...(editedData[field] || [])];
    newArray[index] = value;
    setEditedData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field, emptyItem) => {
    setEditedData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), emptyItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-8 bg-white border-slate-200 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Edit Portfolio</h2>
          <p className="text-slate-600">Make any necessary adjustments before saving</p>
        </div>

        <div className="space-y-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Full Name</Label>
              <Input
                value={editedData.full_name || ''}
                onChange={(e) => updateField('full_name', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Title</Label>
              <Input
                value={editedData.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Email</Label>
              <Input
                type="email"
                value={editedData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label className="text-slate-700 font-semibold mb-2">Phone</Label>
              <Input
                value={editedData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label className="text-slate-700 font-semibold">Professional Summary</Label>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <Textarea
              value={editedData.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
              className="rounded-xl min-h-32"
            />
            <SummaryEnhancer
              currentSummary={editedData.summary}
              experience={editedData.experience}
              title={editedData.title}
              onSelect={(text) => updateField('summary', text)}
            />
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-slate-700 font-semibold">Skills</Label>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('skills', '')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedData.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-1 bg-slate-100 rounded-lg px-3 py-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateArrayItem('skills', index, e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-32"
                  />
                  <button
                    onClick={() => removeArrayItem('skills', index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <SkillsSuggester
              currentSkills={editedData.skills}
              experience={editedData.experience}
              title={editedData.title}
              onAddSkill={(skill) => addArrayItem('skills', skill)}
            />
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Key Achievements</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('achievements', '')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Achievement
              </Button>
            </div>
            <div className="space-y-2">
              {editedData.achievements?.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateArrayItem('achievements', index, e.target.value)}
                    className="rounded-lg flex-1"
                    placeholder="e.g., +15% sales to goal achievement"
                  />
                  <button
                    onClick={() => removeArrayItem('achievements', index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 30-60-90 Day Plan */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Label className="text-slate-700 font-semibold">30-60-90 Day Plan</Label>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <DayPlanGenerator
              title={editedData.title}
              experience={editedData.experience}
              currentPlan={editedData.day_plan}
              onApply={(plan) => updateField('day_plan', plan)}
            />
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {/* 30 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">30 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_30?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_30?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_30?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_30: { ...prev.day_plan?.day_30, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>

              {/* 60 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">60 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_60?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_60?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_60?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_60: { ...prev.day_plan?.day_60, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>

              {/* 90 Days */}
              <Card className="p-4 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">90 Days</h4>
                <Input
                  placeholder="Title"
                  value={editedData.day_plan?.day_90?.title || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, title: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Input
                  placeholder="Subtitle"
                  value={editedData.day_plan?.day_90?.subtitle || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, subtitle: e.target.value }
                      }
                    }));
                  }}
                  className="rounded-lg mb-2"
                />
                <Textarea
                  placeholder="Goals (one per line)"
                  value={editedData.day_plan?.day_90?.items?.join('\n') || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      day_plan: {
                        ...prev.day_plan,
                        day_90: { ...prev.day_plan?.day_90, items: e.target.value.split('\n').filter(i => i.trim()) }
                      }
                    }));
                  }}
                  className="rounded-lg min-h-24"
                />
              </Card>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Experience</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', achievements: [] })}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {editedData.experience?.map((exp, index) => (
                <Card key={index} className="p-4 bg-slate-50 border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-900">Experience {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('experience', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Position"
                      value={exp.position || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], position: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], company: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                    <Input
                      placeholder="Duration (e.g., 2020-2023)"
                      value={exp.duration || ''}
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index] = { ...newExp[index], duration: e.target.value };
                        updateField('experience', newExp);
                      }}
                      className="rounded-lg"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-700 font-semibold">Hobbies & Interests (Optional)</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('hobbies', '')}
                className="rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Hobby
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedData.hobbies?.map((hobby, index) => (
                <div key={index} className="flex items-center gap-1 bg-slate-100 rounded-lg px-3 py-2">
                  <Input
                    value={hobby}
                    onChange={(e) => updateArrayItem('hobbies', index, e.target.value)}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-32"
                    placeholder="e.g., Golf"
                  />
                  <button
                    onClick={() => removeArrayItem('hobbies', index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <Label className="text-slate-700 font-semibold">Case Study (Optional)</Label>
            </div>
            <p className="text-sm text-slate-500 mb-4">Tell the story of your biggest sales win</p>
            
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-amber-50/30 border-amber-200">
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-600 text-sm mb-1">Case Study Headline</Label>
                  <Input
                    placeholder="e.g., Closed $2.4M Enterprise Deal in 6 Months"
                    value={editedData.case_study?.headline || ''}
                    onChange={(e) => {
                      setEditedData(prev => ({
                        ...prev,
                        case_study: { ...prev.case_study, headline: e.target.value }
                      }));
                    }}
                    className="rounded-lg font-semibold"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600 text-sm mb-1">Client Challenge/Goal</Label>
                    <Textarea
                      placeholder="What problem was the client trying to solve?"
                      value={editedData.case_study?.challenge || ''}
                      onChange={(e) => {
                        setEditedData(prev => ({
                          ...prev,
                          case_study: { ...prev.case_study, challenge: e.target.value }
                        }));
                      }}
                      className="rounded-lg min-h-20"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600 text-sm mb-1">Solution You Sold</Label>
                    <Textarea
                      placeholder="What product/solution did you provide?"
                      value={editedData.case_study?.solution || ''}
                      onChange={(e) => {
                        setEditedData(prev => ({
                          ...prev,
                          case_study: { ...prev.case_study, solution: e.target.value }
                        }));
                      }}
                      className="rounded-lg min-h-20"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-600 text-sm mb-1">Your Role</Label>
                  <Input
                    placeholder="e.g., Lead Account Executive, Strategic AE"
                    value={editedData.case_study?.role || ''}
                    onChange={(e) => {
                      setEditedData(prev => ({
                        ...prev,
                        case_study: { ...prev.case_study, role: e.target.value }
                      }));
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <Label className="text-slate-600 text-sm mb-1">Strategy & Actions</Label>
                  <Textarea
                    placeholder="What specific actions did you take to win this deal?"
                    value={editedData.case_study?.actions || ''}
                    onChange={(e) => {
                      setEditedData(prev => ({
                        ...prev,
                        case_study: { ...prev.case_study, actions: e.target.value }
                      }));
                    }}
                    className="rounded-lg min-h-24"
                  />
                </div>

                <div>
                  <Label className="text-slate-600 text-sm mb-1">Challenges & How You Overcame Them</Label>
                  <Textarea
                    placeholder="What obstacles did you face and how did you navigate them?"
                    value={editedData.case_study?.obstacles || ''}
                    onChange={(e) => {
                      setEditedData(prev => ({
                        ...prev,
                        case_study: { ...prev.case_study, obstacles: e.target.value }
                      }));
                    }}
                    className="rounded-lg min-h-20"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600 text-sm mb-1">Key Metrics / Measurable Results</Label>
                    <Textarea
                      placeholder="e.g., $2.4M contract, 85% adoption rate, 3x ROI"
                      value={editedData.case_study?.metrics || ''}
                      onChange={(e) => {
                        setEditedData(prev => ({
                          ...prev,
                          case_study: { ...prev.case_study, metrics: e.target.value }
                        }));
                      }}
                      className="rounded-lg min-h-20"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600 text-sm mb-1">Client Impact / Outcome</Label>
                    <Textarea
                      placeholder="What was the impact on the client's business?"
                      value={editedData.case_study?.impact || ''}
                      onChange={(e) => {
                        setEditedData(prev => ({
                          ...prev,
                          case_study: { ...prev.case_study, impact: e.target.value }
                        }));
                      }}
                      className="rounded-lg min-h-20"
                    />
                  </div>
                </div>

                {/* Results Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-slate-600 text-sm">Results Metrics (for display)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const currentResults = editedData.case_study?.results || [];
                        setEditedData(prev => ({
                          ...prev,
                          case_study: {
                            ...prev.case_study,
                            results: [...currentResults, { metric: '', label: '' }]
                          }
                        }));
                      }}
                      className="rounded-lg text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Metric
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(editedData.case_study?.results || []).map((result, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-slate-200">
                        <Input
                          placeholder="$2.4M"
                          value={result.metric}
                          onChange={(e) => {
                            const newResults = [...(editedData.case_study?.results || [])];
                            newResults[index] = { ...newResults[index], metric: e.target.value };
                            setEditedData(prev => ({
                              ...prev,
                              case_study: { ...prev.case_study, results: newResults }
                            }));
                          }}
                          className="border-0 p-0 h-auto text-amber-600 font-bold text-center focus-visible:ring-0 mb-1"
                        />
                        <Input
                          placeholder="Label"
                          value={result.label}
                          onChange={(e) => {
                            const newResults = [...(editedData.case_study?.results || [])];
                            newResults[index] = { ...newResults[index], label: e.target.value };
                            setEditedData(prev => ({
                              ...prev,
                              case_study: { ...prev.case_study, results: newResults }
                            }));
                          }}
                          className="border-0 p-0 h-auto text-slate-500 text-xs text-center focus-visible:ring-0"
                        />
                        <button
                          onClick={() => {
                            const newResults = (editedData.case_study?.results || []).filter((_, i) => i !== index);
                            setEditedData(prev => ({
                              ...prev,
                              case_study: { ...prev.case_study, results: newResults }
                            }));
                          }}
                          className="text-slate-300 hover:text-red-500 mt-1 w-full flex justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 rounded-xl py-6"
            disabled={isSaving}
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={() => onSave(editedData)}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Portfolio
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}