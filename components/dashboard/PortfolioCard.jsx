import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Mail, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

export default function PortfolioCard({ person, index }) {
  const [sendingToZapier, setSendingToZapier] = useState(false);
  const [showZapierDialog, setShowZapierDialog] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleSendToZapier = async () => {
    if (!webhookUrl.trim()) {
      toast.error('Please enter a webhook URL');
      return;
    }

    setSendingToZapier(true);
    try {
      await base44.functions.invoke('sendPortfolioToZapier', {
        webhook_url: webhookUrl,
        portfolio_id: person.id
      });
      
      toast.success('Portfolio data sent to Zapier successfully');
      setShowZapierDialog(false);
      setWebhookUrl('');
    } catch (error) {
      console.error('Error sending to Zapier:', error);
      toast.error('Failed to send to Zapier');
    } finally {
      setSendingToZapier(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden bg-white border-slate-200 hover:shadow-2xl transition-all duration-500">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
          {person.photo_url && (
            <img
              src={person.photo_url}
              alt={person.full_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-1">{person.full_name}</h3>
            <p className="text-amber-400 font-semibold">{person.title}</p>
          </div>
        </div>
        
        <div className="p-6">
          {person.skills && person.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {person.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {person.skills.length > 3 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                  +{person.skills.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Link to={createPageUrl("Portfolio") + `?id=${person.id}`} className="flex-1">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </Link>
            <Dialog open={showZapierDialog} onOpenChange={setShowZapierDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-xl border-slate-300"
                  title="Send to Zapier"
                >
                  <Zap className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send to Zapier</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Webhook URL
                    </label>
                    <Input
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Paste your Zapier webhook URL to send {person.full_name}'s portfolio data.
                    </p>
                  </div>
                  <Button
                    onClick={handleSendToZapier}
                    disabled={sendingToZapier}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                  >
                    {sendingToZapier ? 'Sending...' : 'Send to Zapier'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-300">
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}