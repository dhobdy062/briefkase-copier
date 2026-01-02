import React from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StatsOverview({ salespeople }) {
  const stats = [
    {
      icon: Users,
      label: "Total Portfolios",
      value: salespeople.length,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Active Profiles",
      value: salespeople.length,
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: Award,
      label: "Top Performers",
      value: Math.min(salespeople.length, 5),
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 bg-white border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}