import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
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

    const { portfolio_id } = await req.json();
    
    if (!portfolio_id) {
      return Response.json({ error: 'portfolio_id is required' }, { status: 400 });
    }

    // Get portfolio data
    const salespeople = await base44.entities.Salesperson.filter({ id: portfolio_id });
    const person = salespeople && salespeople.length > 0 ? salespeople[0] : null;
    
    if (!person) {
      return Response.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Use PDFShift API if key is provided
    const pdfApiKey = Deno.env.get('PDF_SERVICE_API_KEY');
    
    if (pdfApiKey) {
      // Get the app URL from the request
      const appUrl = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/');
      const summaryUrl = `${appUrl}/PortfolioSummary?id=${portfolio_id}`;
      
      // PDFShift uses the API key directly as username with empty password
      const authString = btoa(`api:${pdfApiKey}`);
      
      const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: summaryUrl,
          landscape: true,
          use_print: true,
          wait_for: 'networkidle0',
          delay: 5000,
          format: 'A4',
          margin: '0',
          disable_backgrounds: false,
          full_page: true,
          javascript: true,
          css: `
            .page-break { page-break-after: always; break-after: page; }
            .page-break:last-child { page-break-after: avoid; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          `,
        }),
      });

      if (!pdfResponse.ok) {
        const errorText = await pdfResponse.text();
        console.error('PDFShift error:', errorText);
        return Response.json({ 
          error: 'PDF generation failed', 
          details: errorText,
          fallback: 'print'
        }, { status: 500 });
      }

      const pdfBuffer = await pdfResponse.arrayBuffer();
      
      return new Response(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_portfolio.pdf"`,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Fallback: return instructions to use print dialog
    return Response.json({ 
      success: false,
      fallback: 'print',
      message: 'No PDF service configured. Please use the print dialog.',
      summary_url: `/PortfolioSummary?id=${portfolio_id}`
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return Response.json({ 
      error: error.message,
      fallback: 'print'
    }, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
});