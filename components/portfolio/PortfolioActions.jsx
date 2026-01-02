import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Mail, Share2, Loader2, FileText, Image, X } from "lucide-react";
import { toast } from "sonner";

export default function PortfolioActions({ person, portfolioUrl }) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showImagesDialog, setShowImagesDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const trackDownload = async (downloadType) => {
    const urlParams = new URLSearchParams(window.location.search);
    const personId = urlParams.get('id');
    try {
      await base44.entities.PortfolioDownload.create({
        portfolio_id: personId,
        portfolio_name: person?.full_name || 'Unknown',
        download_type: downloadType
      });
    } catch (err) {
      console.error('Failed to track download:', err);
    }
  };

  const handleDirectPDF = async () => {
    setGeneratingPDF(true);
    toast.info("Generating PDF... This may take a few seconds.");
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const personId = urlParams.get('id');
      
      const response = await base44.functions.invoke('generatePDF', { portfolio_id: personId });
      
      // Check if we got a JSON fallback response (error case)
      if (response.data?.fallback === 'print' || response.data?.error) {
        toast.error("PDF generation failed. Try 'Save as PDF (Print)' option instead.");
        setGeneratingPDF(false);
        return;
      }
      
      // Check if we actually got PDF data (should be binary, not JSON)
      if (typeof response.data === 'object' && !(response.data instanceof ArrayBuffer)) {
        toast.error("PDF generation issue. Try 'Save as PDF (Print)' option instead.");
        setGeneratingPDF(false);
        return;
      }
      
      // Download the PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_portfolio.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      
      await trackDownload('pdf');
      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("PDF generation failed. Try 'Save as PDF (Print)' option instead.");
    }
    
    setGeneratingPDF(false);
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    toast.info("Preparing portfolio for download...");
    
    // Scroll through entire page to render all content
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    for (let i = 0; i < scrollHeight; i += viewportHeight) {
      window.scrollTo(0, i);
      await new Promise(r => setTimeout(r, 100));
    }
    
    // Scroll back to top
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
    
    // Force all sections visible
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
    });
    
    setDownloading(false);
    
    // Open print dialog
    toast.info("In the print dialog, select 'Save as PDF' as the destination");
    trackDownload('print');
    setTimeout(() => window.print(), 200);
  };

  const captureSection = async (section, index) => {
    return new Promise((resolve) => {
      // Clone the section to avoid modifying the original
      const clone = section.cloneNode(true);
      
      // Create an offscreen container
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 1200px;
        background: white;
      `;
      container.appendChild(clone);
      document.body.appendChild(container);
      
      // Force styles
      clone.style.cssText = `
        opacity: 1 !important;
        transform: none !important;
        position: relative !important;
        min-height: auto !important;
        height: auto !important;
        overflow: visible !important;
      `;
      
      // Wait for rendering
      setTimeout(async () => {
        try {
          // Use canvas to capture
          const rect = clone.getBoundingClientRect();
          const canvas = document.createElement('canvas');
          const scale = 2;
          canvas.width = 1200 * scale;
          canvas.height = Math.max(rect.height, 800) * scale;
          
          const ctx = canvas.getContext('2d');
          ctx.scale(scale, scale);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Convert to data URL and upload
          const dataUrl = canvas.toDataURL('image/png', 1.0);
          const blob = await fetch(dataUrl).then(r => r.blob());
          const file = new File([blob], `section_${index}.png`, { type: 'image/png' });
          
          const uploadResult = await base44.integrations.Core.UploadFile({ file });
          
          document.body.removeChild(container);
          resolve(uploadResult?.file_url || null);
        } catch (err) {
          console.error('Capture error:', err);
          document.body.removeChild(container);
          resolve(null);
        }
      }, 100);
    });
  };

  const handleDownloadImages = async () => {
    // Open the Summary View page which has all slides - user can screenshot from there
    const urlParams = new URLSearchParams(window.location.search);
    const personId = urlParams.get('id');
    
    toast.info("Opening Summary View - use your browser or screenshot tool to capture images for Canva");
    await trackDownload('images');
    
    // Open summary view in new tab
    window.open(`/PortfolioSummary?id=${personId}`, '_blank');
  };

  const downloadAllImages = () => {
    generatedImages.forEach((img, index) => {
      const link = document.createElement('a');
      link.href = img.url;
      link.download = `${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_page_${img.index}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    toast.success("Downloading all images...");
  };



  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Portfolio link copied to clipboard!");
  };

  const handleEmailPortfolio = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setSending(true);
    try {
      const portfolioLink = window.location.href;
      
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: `${person.full_name}'s Sales Portfolio`,
        body: `
Hello,

${person.full_name} has shared their professional sales portfolio with you.

View the portfolio here: ${portfolioLink}

Portfolio Highlights:
• Title: ${person.title || 'Sales Professional'}
• Experience: ${person.experience?.length || 0} positions
• Key Skills: ${person.skills?.slice(0, 5).join(', ') || 'View portfolio for details'}

Best regards,
The Briefkase Team
        `.trim()
      });

      toast.success(`Portfolio sent to ${email}!`);
      setShowEmailDialog(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
    setSending(false);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        {/* Download/Print Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-slate-900 text-white shadow-lg hover:bg-slate-800 rounded-full px-5">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={handleDirectPDF} className="cursor-pointer" disabled={generatingPDF}>
              {generatingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer" disabled={downloading}>
              <FileText className="w-4 h-4 mr-2" />
              Save as PDF (Print)
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                const urlParams = new URLSearchParams(window.location.search);
                const personId = urlParams.get('id');
                trackDownload('summary');
                window.open(`/PortfolioSummary?id=${personId}`, '_blank');
              }} 
              className="cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Summary View (All Slides)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadImages} className="cursor-pointer">
              <Image className="w-4 h-4 mr-2" />
              Export for Canva (Images)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Email Button */}
        <Button 
          onClick={() => setShowEmailDialog(true)}
          className="bg-amber-500 text-slate-900 shadow-lg hover:bg-amber-600 rounded-full px-5"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
      </div>

      {/* Images Download Dialog */}
      <Dialog open={showImagesDialog} onOpenChange={setShowImagesDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Portfolio Images</span>
              {generatedImages.length > 0 && !downloading && (
                <Button onClick={downloadAllImages} size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              {downloading ? downloadProgress : `${generatedImages.length} images generated`}
            </DialogDescription>
          </DialogHeader>
          
          {downloading && generatedImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-4" />
              <p className="text-slate-600">{downloadProgress}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {generatedImages.map((img, index) => (
              <div key={index} className="relative group">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full rounded-lg border border-slate-200 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <a
                    href={img.url}
                    download={`${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_page_${img.index}.png`}
                    target="_blank"
                    className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-1 text-center truncate">{img.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Portfolio</DialogTitle>
            <DialogDescription>
              Send a link to this portfolio via email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="email"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                className="flex-1"
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEmailPortfolio}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Styles */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .fixed {
            display: none !important;
          }
          
          html {
            height: auto !important;
            overflow: visible !important;
          }
          
          body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          body > div,
          body > div > div,
          #root,
          #root > div {
            height: auto !important;
            overflow: visible !important;
            display: block !important;
          }
          
          section {
            display: block !important;
            position: relative !important;
            overflow: visible !important;
            height: auto !important;
            min-height: 0 !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          section:last-of-type {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Remove flex centering that causes issues */
          section.min-h-screen {
            min-height: 0 !important;
            height: auto !important;
          }
          
          section.flex {
            display: block !important;
          }
          
          section .flex.items-center.justify-center {
            display: block !important;
          }
          
          /* Ensure content is visible */
          .motion-div, [class*="motion"] {
            opacity: 1 !important;
            transform: none !important;
          }
          
          /* Hide animations */
          [class*="animate-"] {
            animation: none !important;
          }
        }
        
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </>
  );
}