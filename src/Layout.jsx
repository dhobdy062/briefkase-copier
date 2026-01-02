import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Briefcase, Upload, Home, Sparkles, GraduationCap, Building2, Rocket, Trophy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "My Portfolios",
    url: createPageUrl("Dashboard"),
    icon: Briefcase,
  },
  {
    title: "Create Portfolio",
    url: createPageUrl("CreatePortfolio"),
    icon: Upload,
  },
  {
    title: "Career AI Agent",
    url: createPageUrl("CareerAgent"),
    icon: Sparkles,
  },
  {
    title: "Candidates",
    url: createPageUrl("Candidates"),
    icon: GraduationCap,
  },
  {
    title: "HR Interviews",
    url: createPageUrl("Interviews"),
    icon: Building2,
  },
];

const valueLadder = [
  {
    title: "Free Tools",
    url: createPageUrl("Home") + "#lead-magnet",
    icon: Sparkles,
    badge: "FREE",
    badgeColor: "bg-green-500",
  },
  {
    title: "Template Packs",
    url: createPageUrl("Home") + "#pricing",
    icon: Trophy,
    badge: "$27-97",
    badgeColor: "bg-blue-500",
  },
  {
    title: "Done-For-You",
    url: createPageUrl("Home") + "#pricing",
    icon: Rocket,
    badge: "$297+",
    badgeColor: "bg-amber-500",
  },
  {
    title: "Enterprise",
    url: createPageUrl("Home") + "#pricing",
    icon: Building2,
    badge: "CUSTOM",
    badgeColor: "bg-purple-500",
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const isPortfolioView = currentPageName === "Portfolio";
  const isPortfolioSummary = currentPageName === "PortfolioSummary";
  const isHomeView = currentPageName === "Home";

  if (isPortfolioView || isPortfolioSummary || isHomeView) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <style>{`
          :root {
            --primary: 215 25% 27%;
            --primary-foreground: 0 0% 100%;
            --accent: 43 96% 56%;
          }
        `}</style>
        
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-xl bg-white/80">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
                alt="Briefkase"
                className="h-8"
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
                          <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                              Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                              <SidebarMenu>
                                {navigationItems.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                      asChild 
                                      className={`hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1 ${
                                        location.pathname === item.url ? 'bg-slate-900 text-white hover:bg-slate-800' : ''
                                      }`}
                                    >
                                      <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                        <item.icon className="w-4 h-4" />
                                        <span className="font-medium">{item.title}</span>
                                      </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </SidebarGroup>

                          {/* Value Ladder - Hormozi $100M Strategy */}
                          <SidebarGroup className="mt-4">
                            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                              Career Transformation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                              <SidebarMenu>
                                {valueLadder.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                      asChild 
                                      className="hover:bg-slate-100 transition-all duration-200 rounded-xl mb-1"
                                    >
                                      <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                        <item.icon className="w-4 h-4 text-slate-600" />
                                        <span className="font-medium text-sm flex-1">{item.title}</span>
                                        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                                          {item.badge}
                                        </span>
                                      </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </SidebarGroup>

                          {/* Grand Slam Offer CTA */}
                          <div className="mt-6 mx-2 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Rocket className="w-5 h-5 text-amber-600" />
                              <span className="font-bold text-slate-900 text-sm">Grand Slam Offer</span>
                            </div>
                            <p className="text-xs text-slate-600 mb-3">
                              Get a job-winning portfolio done for you — guaranteed or we rebuild free.
                            </p>
                            <Link to={createPageUrl("CreatePortfolio")}>
                              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold text-sm py-2 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm">
                                Start Free →
                              </button>
                            </Link>
                          </div>
                        </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691bdb06ad7d9d6aed9c3e5c/9e08195bb_riefKase1.png"
                alt="Briefkase"
                className="h-6"
              />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}