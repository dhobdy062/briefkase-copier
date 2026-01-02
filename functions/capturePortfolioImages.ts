import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

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

    const { portfolio_id } = await req.json();

    if (!portfolio_id) {
      return Response.json({ error: 'portfolio_id is required' }, { status: 400 });
    }

    // Get portfolio data
    const portfolios = await base44.entities.Salesperson.filter({ id: portfolio_id });
    if (!portfolios || portfolios.length === 0) {
      return Response.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const person = portfolios[0];

    // Use the summary page URL which has all slides on one page
    const baseUrl = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/[^/]*$/, '') || '';
    const summaryUrl = `${baseUrl}/PortfolioSummary?id=${portfolio_id}`;

    // Use screenshotone.com API (free tier available)
    const apiKey = Deno.env.get('SCREENSHOT_API_KEY');
    
    if (!apiKey) {
      // Fallback: return the summary URL for manual screenshot
      return Response.json({
        success: false,
        message: 'Screenshot service not configured. Use the Summary View to manually capture screenshots.',
        summary_url: summaryUrl,
        person_name: person.full_name
      });
    }

    // Capture screenshot using screenshotone API
    const screenshotUrl = `https://api.screenshotone.com/take?access_key=${apiKey}&url=${encodeURIComponent(summaryUrl)}&full_page=true&viewport_width=1200&viewport_height=800&format=png&delay=3`;

    const screenshotResponse = await fetch(screenshotUrl);
    
    if (!screenshotResponse.ok) {
      return Response.json({
        success: false,
        message: 'Screenshot capture failed. Use the Summary View to manually capture screenshots.',
        summary_url: summaryUrl
      });
    }

    const imageBlob = await screenshotResponse.blob();
    
    // Upload to Base44 storage
    const uploadResult = await base44.integrations.Core.UploadFile({
      file: new File([imageBlob], `${person.full_name?.replace(/\s+/g, '_') || 'portfolio'}_full.png`, { type: 'image/png' })
    });

    return Response.json({
      success: true,
      image_url: uploadResult.file_url,
      person_name: person.full_name,
      summary_url: summaryUrl
    });

  } catch (error) {
    console.error('Screenshot error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});