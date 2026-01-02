import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Printer, FileDown, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function DownloadStats() {
  const { data: downloads = [], isLoading } = useQuery({
    queryKey: ['portfolio-downloads'],
    queryFn: () => base44.entities.PortfolioDownload.list('-created_date', 100),
    refetchOnWindowFocus: false,
  });

  if (isLoading || downloads.length === 0) {
    return null;
  }

  const stats = {
    pdf: downloads.filter(d => d.download_type === 'pdf').length,
    print: downloads.filter(d => d.download_type === 'print').length,
    images: downloads.filter(d => d.download_type === 'images').length,
    summary: downloads.filter(d => d.download_type === 'summary').length,
    total: downloads.length
  };

  const recentDownloads = downloads.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-500" />
            Download Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-xs text-slate-500">Total Downloads</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <FileText className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{stats.pdf}</div>
              <div className="text-xs text-slate-500">PDF</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <Printer className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{stats.print}</div>
              <div className="text-xs text-slate-500">Print</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <ImageIcon className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{stats.images}</div>
              <div className="text-xs text-slate-500">Images</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <FileDown className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-slate-900">{stats.summary}</div>
              <div className="text-xs text-slate-500">Summary</div>
            </div>
          </div>

          {recentDownloads.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Downloads</h4>
              <div className="space-y-2">
                {recentDownloads.map((download, i) => (
                  <div key={download.id} className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded-lg">
                    <span className="font-medium text-slate-700">{download.portfolio_name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 bg-white rounded-full text-slate-600 capitalize">
                        {download.download_type}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(download.created_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}