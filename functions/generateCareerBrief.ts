import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import { jsPDF } from 'npm:jspdf@2.5.1';

Deno.serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }

    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { candidate_id } = await req.json();

        if (!candidate_id) {
            return Response.json({ error: 'candidate_id is required' }, { status: 400 });
        }

        const candidates = await base44.entities.Candidate.filter({ id: candidate_id });
        
        if (!candidates || candidates.length === 0) {
            return Response.json({ error: 'Candidate not found' }, { status: 404 });
        }

        const candidate = candidates[0];

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let yPos = 20;

        // Header - BriefKase Branding
        doc.setFillColor(30, 41, 59); // slate-900
        doc.rect(0, 0, pageWidth, 35, 'F');
        doc.setFontSize(24);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Career Intelligence Brief', margin, 20);
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('Powered by TheBriefKase', margin, 28);

        yPos = 50;

        // Candidate Info
        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59);
        doc.setFont(undefined, 'bold');
        doc.text(candidate.full_name || 'Candidate', margin, yPos);
        yPos += 8;

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(71, 85, 105);
        if (candidate.target_role) {
            doc.text(candidate.target_role, margin, yPos);
            yPos += 6;
        }
        doc.text(candidate.email || '', margin, yPos);
        yPos += 15;

        // Career Trust Score - Large Display
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 40, 5, 5, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(71, 85, 105);
        doc.setFont(undefined, 'bold');
        doc.text('Career Trust Score™', margin + 10, yPos + 12);

        doc.setFontSize(36);
        doc.setTextColor(30, 41, 59);
        doc.setFont(undefined, 'bold');
        const score = candidate.career_trust_score || 0;
        doc.text(`${score}`, margin + 10, yPos + 32);

        doc.setFontSize(18);
        doc.setTextColor(148, 163, 184);
        doc.text('/ 100', margin + 35, yPos + 32);

        // Risk Indicator
        const getRiskColor = (indicator) => {
            switch (indicator) {
                case 'Green': return { r: 34, g: 197, b: 94, text: '🟢 Green Risk' };
                case 'Yellow': return { r: 234, g: 179, b: 8, text: '🟡 Yellow Risk' };
                case 'Red': return { r: 239, g: 68, b: 68, text: '🔴 Red Risk' };
                default: return { r: 148, g: 163, b: 184, text: '⚪ Not Scored' };
            }
        };

        const riskColor = getRiskColor(candidate.risk_indicator);
        doc.setFillColor(riskColor.r, riskColor.g, riskColor.b);
        doc.roundedRect(margin + 120, yPos + 10, 50, 12, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text(riskColor.text, margin + 125, yPos + 18);

        yPos += 55;

        // Score Breakdown Table
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59);
        doc.setFont(undefined, 'bold');
        doc.text('Score Breakdown', margin, yPos);
        yPos += 10;

        const categories = [
            { label: 'Career Consistency', score: candidate.career_consistency_score || 0, max: 25 },
            { label: 'Skill Proof & Evidence', score: candidate.skill_proof_score || 0, max: 25 },
            { label: 'Role Alignment', score: candidate.role_alignment_score || 0, max: 20 },
            { label: 'Professional Presence', score: candidate.professional_presence_score || 0, max: 15 },
            { label: 'Data Completeness', score: candidate.data_completeness_score || 0, max: 15 }
        ];

        // Table header
        doc.setFillColor(30, 41, 59);
        doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.text('Category', margin + 5, yPos + 7);
        doc.text('Score', pageWidth - margin - 35, yPos + 7);
        doc.text('Max', pageWidth - margin - 15, yPos + 7);
        yPos += 10;

        // Table rows
        categories.forEach((cat, index) => {
            const rowColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
            doc.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
            doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
            
            doc.setTextColor(71, 85, 105);
            doc.setFont(undefined, 'normal');
            doc.text(cat.label, margin + 5, yPos + 7);
            doc.setFont(undefined, 'bold');
            doc.text(String(cat.score), pageWidth - margin - 35, yPos + 7);
            doc.setFont(undefined, 'normal');
            doc.text(String(cat.max), pageWidth - margin - 15, yPos + 7);
            yPos += 10;
        });

        yPos += 10;

        // Summary Narrative
        if (candidate.analysis_summary) {
            doc.setFontSize(14);
            doc.setTextColor(30, 41, 59);
            doc.setFont(undefined, 'bold');
            doc.text('Analysis Summary', margin, yPos);
            yPos += 8;

            doc.setFontSize(10);
            doc.setTextColor(71, 85, 105);
            doc.setFont(undefined, 'normal');
            
            const summaryLines = doc.splitTextToSize(candidate.analysis_summary, pageWidth - 2 * margin);
            doc.text(summaryLines, margin, yPos);
            yPos += summaryLines.length * 5 + 10;
        }

        // Disclaimer
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFillColor(254, 243, 199);
        const disclaimerHeight = 30;
        doc.roundedRect(margin, yPos, pageWidth - 2 * margin, disclaimerHeight, 3, 3, 'F');
        
        doc.setFontSize(8);
        doc.setTextColor(146, 64, 14);
        doc.setFont(undefined, 'bold');
        doc.text('DISCLAIMER', margin + 5, yPos + 7);
        
        doc.setFont(undefined, 'normal');
        const disclaimerText = 'This Career Trust Score supports hiring conversations and candidate evaluation. It does not replace formal interviews, reference checks, or background verification. All scores are based on available information and professional analysis.';
        const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - 2 * margin - 10);
        doc.text(disclaimerLines, margin + 5, yPos + 13);

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(148, 163, 184);
            doc.text(
                `TheBriefKase.com | Generated: ${new Date().toLocaleDateString()}`,
                margin,
                doc.internal.pageSize.getHeight() - 10
            );
            doc.text(
                `Page ${i} of ${pageCount}`,
                pageWidth - margin - 20,
                doc.internal.pageSize.getHeight() - 10
            );
        }

        const pdfBytes = doc.output('arraybuffer');

        return new Response(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Career_Brief_${candidate.full_name?.replace(/\s+/g, '_')}.pdf"`
            }
        });
    } catch (err: any) {
        console.error('Error generating PDF:', err);
        return Response.json({ error: err.message }, { status: 500 });
    }
});