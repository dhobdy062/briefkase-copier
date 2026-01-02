import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, Briefcase, TrendingUp, DollarSign, Target, Award,
  CheckCircle, Building, Calendar, ArrowRight, Palette, BarChart3,
  PieChart, Users, Zap, MessageSquare, Database, Globe, Settings, Pencil,
  Heart, Music, Camera, Gamepad2, BookOpen, Dumbbell, Plane, Coffee, FileDown
} from "lucide-react";

// Cover Page Component
const CoverPage = ({ person }) => {
  const initials = person.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'SP';

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-amber-400 rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-amber-400 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-400/30 rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        {/* Gold Initials Circle */}
        <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/20">
          {person.photo_url ? (
            <img 
              src={person.photo_url} 
              alt={person.full_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-slate-900">{initials}</span>
          )}
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {person.full_name}
        </h1>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-0.5 bg-amber-500" />
          <span className="text-xl text-amber-400 font-medium tracking-widest uppercase">
            Sales Portfolio
          </span>
          <div className="w-12 h-0.5 bg-amber-500" />
        </div>

        {/* Title */}
        <p className="text-2xl text-slate-300 mb-12">{person.title}</p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-slate-500"
        >
          <ArrowRight className="w-6 h-6 mx-auto rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Dashboard Page Component
const DashboardPage = ({ person }) => {
  const kpis = [
    { label: "Quota Attainment", value: "142%", icon: Target, color: "text-amber-400" },
    { label: "Revenue Closed", value: "$2.8M", icon: DollarSign, color: "text-emerald-400" },
    { label: "Pipeline Created", value: "$5.2M", icon: TrendingUp, color: "text-blue-400" },
    { label: "Win Rate", value: "34%", icon: Award, color: "text-purple-400" },
  ];

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sales Dashboard
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto" />
        </motion.div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <kpi.icon className={`w-7 h-7 ${kpi.color}`} />
              </div>
              <div className={`text-4xl font-bold ${kpi.color} mb-2`}>{kpi.value}</div>
              <div className="text-slate-400 text-sm">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              Quarterly Performance
            </h3>
            <div className="flex items-end gap-4 h-48">
              {[65, 80, 95, 142].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg transition-all"
                    style={{ height: `${value * 1.2}px` }}
                  />
                  <span className="text-sm text-slate-500 mt-2">Q{i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pipeline Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-500" />
              Deal Distribution
            </h3>
            <div className="flex items-center justify-center h-48">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" 
                    strokeDasharray="150 251.2" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" 
                    strokeDasharray="60 251.2" strokeDashoffset="-150" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" 
                    strokeDasharray="41.2 251.2" strokeDashoffset="-210" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">$5.2M</span>
                </div>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-sm text-slate-600">Enterprise (60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-slate-600">Mid-Market (24%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-slate-600">SMB (16%)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Deal Wins Page Component
const DealWinsPage = ({ person }) => {
  const wins = person.experience?.[0]?.achievements?.slice(0, 5) || [
    "Closed $1.2M enterprise deal with Fortune 500 company",
    "Won strategic partnership worth $800K ARR",
    "Secured 3-year contract with tech unicorn",
    "Landed largest deal in company history",
    "Expanded existing account by 250%"
  ];

  const dealDetails = [
    { size: "$1.2M", industry: "Enterprise Software", timeline: "6 months", role: "Lead AE", outcome: "+$1.2M ARR" },
    { size: "$800K", industry: "FinTech", timeline: "4 months", role: "Strategic AE", outcome: "3-year contract" },
    { size: "$450K", industry: "Healthcare", timeline: "3 months", role: "Account Executive", outcome: "Platform expansion" },
    { size: "$320K", industry: "E-commerce", timeline: "2 months", role: "Lead AE", outcome: "Multi-product deal" },
    { size: "$280K", industry: "SaaS", timeline: "5 months", role: "Enterprise AE", outcome: "Global rollout" },
  ];

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Deal Wins
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto" />
        </motion.div>

        <div className="space-y-6">
          {dealDetails.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800 rounded-2xl p-6 border-l-4 border-amber-500"
            >
              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{deal.size}</div>
                  <div className="text-sm text-slate-400">Deal Size</div>
                </div>
                <div className="w-px h-12 bg-slate-700 hidden md:block" />
                <div className="flex-1 grid md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Industry</div>
                    <div className="text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-500" />
                      {deal.industry}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Timeline</div>
                    <div className="text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      {deal.timeline}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Role</div>
                    <div className="text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      {deal.role}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Outcome</div>
                    <div className="text-amber-400 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {deal.outcome}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Case Study Page Component
const CaseStudyPage = ({ person, onEditCaseStudy }) => {
  const defaultCaseStudy = {
    headline: "Enterprise Digital Transformation Win",
    challenge: "Enterprise client struggling with legacy system migration, causing 40% productivity loss across 500+ users.",
    solution: "Cloud-based platform with custom integrations and dedicated implementation support.",
    role: "Lead Account Executive",
    actions: "Led cross-functional team of 8 through 6-month deployment with weekly stakeholder reviews.",
    obstacles: "Initial budget concerns from CFO — addressed with phased implementation plan and guaranteed ROI timeline.",
    metrics: "$2.4M contract value, 85% adoption rate, 3x ROI in first year",
    impact: "Reduced manual processes by 60%, enabling team to focus on strategic initiatives.",
    results: [
      { metric: "$2.4M", label: "Contract Value" },
      { metric: "85%", label: "Adoption Rate" },
      { metric: "3x", label: "ROI Achieved" },
      { metric: "40%", label: "Efficiency Gain" },
    ]
  };

  const caseStudy = person.case_study || defaultCaseStudy;
  const hasCustomCaseStudy = !!person.case_study;

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            {caseStudy.headline || "Case Study"}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
          {onEditCaseStudy && (
            <Button
              onClick={onEditCaseStudy}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Pencil className="w-3 h-3 mr-2" />
              {hasCustomCaseStudy ? 'Edit Case Study' : 'Add Your Case Study'}
            </Button>
          )}
        </motion.div>

        {/* Deal Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 rounded-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Client Goal</div>
              <div className="text-slate-900 font-medium">{caseStudy.challenge}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Solution</div>
              <div className="text-slate-900 font-medium">{caseStudy.solution}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase mb-1">Your Role</div>
              <div className="text-slate-900 font-medium">{caseStudy.role}</div>
            </div>
          </div>
        </motion.div>

        {/* Strategy & Execution + Obstacles */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-8 border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Strategy & Execution</h3>
            <p className="text-slate-600 leading-relaxed">{caseStudy.actions}</p>
          </motion.div>

          {caseStudy.obstacles && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-2xl p-8 border-l-4 border-purple-500"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Challenges & Obstacle Navigation</h3>
              <p className="text-slate-600 leading-relaxed">{caseStudy.obstacles}</p>
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Results</h3>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {(caseStudy.results || defaultCaseStudy.results).map((result, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{result.metric}</div>
                <div className="text-slate-400">{result.label}</div>
              </div>
            ))}
          </div>

          {/* Key Metrics & Impact */}
          <div className="grid md:grid-cols-2 gap-6 border-t border-slate-700 pt-6">
            <div>
              <div className="text-amber-400 font-semibold text-sm mb-2">Key Metrics</div>
              <p className="text-slate-300">{caseStudy.metrics}</p>
            </div>
            {caseStudy.impact && (
              <div>
                <div className="text-amber-400 font-semibold text-sm mb-2">Client Impact</div>
                <p className="text-slate-300">{caseStudy.impact}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Win Summary Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-center"
        >
          <div className="text-amber-900 font-semibold text-sm mb-1">WIN SUMMARY</div>
          <div className="text-2xl font-bold text-slate-900">{caseStudy.headline}</div>
        </motion.div>
      </div>
    </section>
  );
};

// Skills & Tools Page Component
const SkillsToolsPage = ({ person }) => {
  const tools = [
    { name: "Salesforce", icon: Database, category: "CRM" },
    { name: "HubSpot", icon: Settings, category: "CRM" },
    { name: "Outreach", icon: MessageSquare, category: "Outreach" },
    { name: "SalesLoft", icon: Zap, category: "Outreach" },
    { name: "LinkedIn Navigator", icon: Users, category: "Prospecting" },
    { name: "ZoomInfo", icon: Globe, category: "Intelligence" },
    { name: "Gong", icon: BarChart3, category: "Analytics" },
    { name: "Chorus", icon: MessageSquare, category: "Analytics" },
  ];

  const methodologies = [
    "MEDDIC", "SPIN Selling", "Challenger Sale", "Value Selling",
    "Solution Selling", "Sandler", "BANT", "Gap Selling"
  ];

  const skills = person.skills || [
    "Enterprise Sales", "Account Management", "Pipeline Development",
    "Contract Negotiation", "C-Suite Selling", "Team Leadership",
    "Strategic Planning", "Revenue Forecasting"
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Skills & Tools
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto" />
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-3">
                  <tool.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="font-semibold text-slate-900">{tool.name}</div>
                <div className="text-sm text-slate-500">{tool.category}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Methodologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Sales Methodologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {methodologies.map((method, i) => (
              <span key={i} className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                {method}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Core Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <span key={i} className="bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Hobbies Page Component
const HobbiesPage = ({ person }) => {
  const hobbies = person.hobbies || [];
  
  // Default hobby icons - cycle through them
  const hobbyIcons = [Music, Camera, Gamepad2, BookOpen, Dumbbell, Plane, Coffee, Heart];
  
  if (hobbies.length === 0) return null;

  return (
    <section className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Beyond Work
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            When I'm not closing deals, you'll find me...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, i) => {
            const IconComponent = hobbyIcons[i % hobbyIcons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{hobby}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Contact Page Component
const ContactPage = ({ person }) => {
  return (
    <section className="min-h-screen bg-white py-20 px-6 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Gold Accent Line */}
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Ready to bring results-driven sales leadership to your team? Let's talk.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            {person.email && (
              <a 
                href={`mailto:${person.email}`}
                className="flex items-center gap-3 text-lg text-slate-700 hover:text-amber-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                {person.email}
              </a>
            )}
            {person.phone && (
              <a 
                href={`tel:${person.phone}`}
                className="flex items-center gap-3 text-lg text-slate-700 hover:text-amber-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                {person.phone}
              </a>
            )}
          </div>

          {/* Resume Link */}
          {person.resume_url && (
            <a 
              href={person.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              Download Resume
            </a>
          )}

          {/* Gold Accent Line */}
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-12" />
        </motion.div>
      </div>
    </section>
  );
};

// Thank You Page Component
const ThankYouPage = ({ person, onChangeTemplate }) => {
  const firstName = person.full_name?.split(' ')[0] || 'there';
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-amber-400 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-amber-400 rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 px-6"
      >
        {/* Thank You Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/20">
          <Award className="w-12 h-12 text-slate-900" />
        </div>

        {/* Thank You Message */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Thank You
        </h2>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-amber-500" />
          <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
            For Your Time
          </span>
          <div className="w-12 h-0.5 bg-amber-500" />
        </div>

        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          I appreciate you taking the time to review my portfolio. I'm excited about the opportunity to bring my experience and results-driven approach to your team.
        </p>

        <p className="text-lg text-slate-400 mb-12">
          — {person.full_name}
        </p>

        {/* Contact CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {person.email && (
            <a 
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          )}
          {person.resume_url && (
            <a 
              href={person.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-xl font-semibold hover:bg-amber-500/10 transition-all"
            >
              <Briefcase className="w-5 h-5" />
              Download Resume
            </a>
          )}
          <a 
            href={`/PortfolioSummary?id=${new URLSearchParams(window.location.search).get('id')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-xl font-semibold hover:bg-amber-500/10 transition-all"
          >
            <FileDown className="w-5 h-5" />
            Download Portfolio
          </a>
        </div>
      </motion.div>

      {/* Change Template Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onChangeTemplate}
          className="bg-white text-slate-900 shadow-lg hover:shadow-xl rounded-full px-6"
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Template
        </Button>
      </div>
    </section>
  );
};

// Main Template Component
export default function BriefkasePremiumTemplate({ person, onChangeTemplate, onEditCaseStudy }) {
  return (
    <div className="bg-white">
      <CoverPage person={person} />
      <DashboardPage person={person} />
      <DealWinsPage person={person} />
      <CaseStudyPage person={person} onEditCaseStudy={onEditCaseStudy} />
      <SkillsToolsPage person={person} />
      <HobbiesPage person={person} />
      <ContactPage person={person} />
      <ThankYouPage person={person} onChangeTemplate={onChangeTemplate} />
    </div>
  );
}