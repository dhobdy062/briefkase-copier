import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  // Handle CORS for Zapier
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const base44 = createClientFromRequest(req);
    
    // Get request body
    const body = await req.json().catch(() => ({}));
    const { action, portfolio_id, webhook_url } = body;

    // Action: List all portfolios
    if (action === 'list_portfolios') {
      const salespeople = await base44.asServiceRole.entities.Salesperson.list();
      return Response.json({
        success: true,
        portfolios: salespeople.map(p => ({
          id: p.id,
          full_name: p.full_name,
          title: p.title,
          email: p.email,
          created_date: p.created_date,
        })),
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Action: Get portfolio details for PDF
    if (action === 'get_portfolio' && portfolio_id) {
      const salespeople = await base44.asServiceRole.entities.Salesperson.filter({ id: portfolio_id });
      const person = salespeople && salespeople.length > 0 ? salespeople[0] : null;
      
      if (!person) {
        return Response.json({ success: false, error: 'Portfolio not found' }, { 
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }

      // Return full portfolio data for Zapier to use
      return Response.json({
        success: true,
        portfolio: {
          id: person.id,
          full_name: person.full_name,
          title: person.title,
          email: person.email,
          phone: person.phone,
          photo_url: person.photo_url,
          summary: person.summary,
          experience: person.experience,
          skills: person.skills,
          achievements: person.achievements,
          education: person.education,
          day_plan: person.day_plan,
          case_study: person.case_study,
          template: person.template,
          resume_url: person.resume_url,
          created_date: person.created_date,
          updated_date: person.updated_date,
        },
        portfolio_url: `https://your-app-url.base44.app/Portfolio?id=${person.id}`,
        summary_url: `https://your-app-url.base44.app/PortfolioSummary?id=${person.id}`,
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Action: Notify webhook when portfolio is created/updated
    if (action === 'subscribe' && webhook_url) {
      // Store webhook URL for future notifications
      // In a real scenario, you'd store this in an entity
      return Response.json({
        success: true,
        message: 'Webhook subscribed successfully',
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return Response.json({
      success: true,
      message: 'Zapier webhook endpoint ready',
      available_actions: ['list_portfolios', 'get_portfolio', 'subscribe'],
      usage: {
        list_portfolios: { action: 'list_portfolios' },
        get_portfolio: { action: 'get_portfolio', portfolio_id: 'your-portfolio-id' },
        subscribe: { action: 'subscribe', webhook_url: 'your-zapier-webhook-url' },
      },
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

  } catch (err: any) {
    console.error('Webhook error:', err);
    return Response.json({ success: false, error: err.message }, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
});