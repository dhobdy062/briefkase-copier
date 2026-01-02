import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
} from 'npm:docx@8.1.3';

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

    const title = new Paragraph({
      text: 'Career Intelligence Brief',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
    });

    const subtitle = new Paragraph({
      children: [
        new TextRun({ text: 'Powered by TheBriefKase', italics: true, size: 20, color: '666666' }),
      ],
    });

    const candidateHeader = new Paragraph({
      children: [
        new TextRun({ text: candidate.full_name || 'Candidate', bold: true, size: 28 }),
      ],
      spacing: { after: 200 },
    });

    const candidateMeta: Paragraph[] = [
      ...(candidate.target_role
        ? [new Paragraph({ children: [new TextRun({ text: String(candidate.target_role), color: '444444' })] })]
        : []),
      new Paragraph({ children: [new TextRun({ text: String(candidate.email || ''), color: '666666' })] }),
    ];

    const trustLabel = new Paragraph({
      children: [new TextRun({ text: 'Career Trust Score™', bold: true, size: 24 })],
      spacing: { before: 200, after: 100 },
    });

    const trustScore = new Paragraph({
      children: [
        new TextRun({ text: String(candidate.career_trust_score || 0), bold: true, size: 56 }),
        new TextRun({ text: ' / 100', color: '888888', size: 32 }),
      ],
      spacing: { after: 200 },
    });

    const getRiskText = (indicator: string | undefined) => {
      switch (indicator) {
        case 'Green': return '🟢 Green Risk';
        case 'Yellow': return '🟡 Yellow Risk';
        case 'Red': return '🔴 Red Risk';
        default: return '⚪ Not Scored';
      }
    };

    const riskIndicator = new Paragraph({
      children: [new TextRun({ text: getRiskText(candidate.risk_indicator), bold: true, color: 'ffffff' })],
    });

    const categories = [
      { label: 'Career Consistency', score: candidate.career_consistency_score || 0, max: 25 },
      { label: 'Skill Proof & Evidence', score: candidate.skill_proof_score || 0, max: 25 },
      { label: 'Role Alignment', score: candidate.role_alignment_score || 0, max: 20 },
      { label: 'Professional Presence', score: candidate.professional_presence_score || 0, max: 15 },
      { label: 'Data Completeness', score: candidate.data_completeness_score || 0, max: 15 },
    ];

    const tableHeader = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Category', bold: true, color: 'ffffff' })] })],
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Score', bold: true, color: 'ffffff' })] })],
          width: { size: 1500, type: WidthType.DXA },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Max', bold: true, color: 'ffffff' })] })],
          width: { size: 1500, type: WidthType.DXA },
        }),
      ],
    });

    const tableRows = categories.map((cat) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(cat.label)] }),
          new TableCell({ children: [new Paragraph(String(cat.score))], width: { size: 1500, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph(String(cat.max))], width: { size: 1500, type: WidthType.DXA } }),
        ],
      })
    );

    const breakdownTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [tableHeader, ...tableRows],
    });

    const summarySection: Paragraph[] = [];
    if (candidate.analysis_summary) {
      summarySection.push(
        new Paragraph({ text: 'Analysis Summary', heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } })
      );
      summarySection.push(
        new Paragraph({
          children: [new TextRun({ text: String(candidate.analysis_summary), size: 22 })],
        })
      );
    }

    const disclaimer = new Paragraph({
      children: [
        new TextRun({ text: 'DISCLAIMER', bold: true, color: 'b45309', size: 20 }),
        new TextRun({
          text:
            ' This Career Trust Score supports hiring conversations and candidate evaluation. It does not replace formal interviews, reference checks, or background verification. All scores are based on available information and professional analysis.',
          color: '7c2d12',
          size: 20,
        }),
      ],
      spacing: { before: 300, after: 200 },
    });

    const footer = new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `TheBriefKase.com | Generated: ${new Date().toLocaleDateString()}`,
          color: '888888',
          size: 18,
        }),
      ],
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            title,
            subtitle,
            candidateHeader,
            ...candidateMeta,
            trustLabel,
            trustScore,
            new Paragraph({ text: 'Score Breakdown', heading: HeadingLevel.HEADING_2 }),
            breakdownTable,
            ...summarySection,
            disclaimer,
            footer,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="Career_Brief_${String(candidate.full_name || 'Candidate').replace(/\s+/g, '_')}.docx"`,
      },
    });
  } catch (err: any) {
    console.error('Error generating DOCX:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
});
