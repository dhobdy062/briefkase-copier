import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const base44 = createClientFromRequest(req);
    
    // Parse request body
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is OK for some actions
    }

    const { action, portfolio_id, webhook_url } = body;

    // Get the app URL from the request
    const appUrl = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'https://briefkase.base44.app';

    // Action: Get single portfolio data (for Zapier to fetch)
    if (action === 'get_portfolio' && portfolio_id) {
      const portfolios = await base44.asServiceRole.entities.Salesperson.filter({ id: portfolio_id });
      
      if (portfolios.length === 0) {
        return new Response(JSON.stringify({ error: 'Portfolio not found' }), {
          status: 404,
          headers: corsHeaders,
        });
      }

      const portfolio = portfolios[0];
      
      return new Response(JSON.stringify({
        success: true,
        portfolio: {
          id: portfolio.id,
          full_name: portfolio.full_name,
          title: portfolio.title,
          email: portfolio.email,
          phone: portfolio.phone,
          photo_url: portfolio.photo_url,
          summary: portfolio.summary,
          skills: portfolio.skills || [],
          achievements: portfolio.achievements || [],
          experience: portfolio.experience || [],
          education: portfolio.education || [],
          template: portfolio.template,
          resume_url: portfolio.resume_url,
          created_date: portfolio.created_date,
          updated_date: portfolio.updated_date,
          portfolio_url: `${appUrl}/Portfolio?id=${portfolio.id}`,
          summary_url: `${appUrl}/PortfolioSummary?id=${portfolio.id}`,
        }
      }), {
        headers: corsHeaders,
      });
    }

    // Action: List all portfolios
    if (action === 'list_portfolios') {
      const portfolios = await base44.asServiceRole.entities.Salesperson.list('-created_date', 50);
      
      return new Response(JSON.stringify({
        success: true,
        count: portfolios.length,
        portfolios: portfolios.map(p => ({
          id: p.id,
          full_name: p.full_name,
          title: p.title,
          email: p.email,
          template: p.template,
          created_date: p.created_date,
          portfolio_url: `${appUrl}/Portfolio?id=${p.id}`,
        }))
      }), {
        headers: corsHeaders,
      });
    }

    // Action: Trigger webhook with portfolio data (push to Zapier)
    if (action === 'trigger_webhook' && portfolio_id && webhook_url) {
      const portfolios = await base44.asServiceRole.entities.Salesperson.filter({ id: portfolio_id });
      
      if (portfolios.length === 0) {
        return new Response(JSON.stringify({ error: 'Portfolio not found' }), {
          status: 404,
          headers: corsHeaders,
        });
      }

      const portfolio = portfolios[0];
      
      // Send data to Zapier webhook
      const webhookResponse = await fetch(webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'portfolio_ready',
          timestamp: new Date().toISOString(),
          portfolio: {
            id: portfolio.id,
            full_name: portfolio.full_name,
            title: portfolio.title,
            email: portfolio.email,
            phone: portfolio.phone,
            summary: portfolio.summary,
            skills: portfolio.skills || [],
            template: portfolio.template,
            portfolio_url: `https://briefkase.base44.app/Portfolio?id=${portfolio.id}`,
            summary_url: `https://briefkase.base44.app/PortfolioSummary?id=${portfolio.id}`,
          }
        })
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Webhook triggered successfully',
        webhook_status: webhookResponse.status,
      }), {
        headers: corsHeaders,
      });
    }

    // Default: Return available actions
    return new Response(JSON.stringify({
      success: true,
      message: 'Zapier Portfolio Webhook Endpoint',
      available_actions: [
        {
          action: 'get_portfolio',
          description: 'Get single portfolio data',
          required_params: ['portfolio_id']
        },
        {
          action: 'list_portfolios', 
          description: 'List all portfolios',
          required_params: []
        },
        {
          action: 'trigger_webhook',
          description: 'Push portfolio data to a Zapier webhook URL',
          required_params: ['portfolio_id', 'webhook_url']
        }
      ],
      example: {
        action: 'get_portfolio',
        portfolio_id: 'your-portfolio-id'
      }
    }), {
      headers: corsHeaders,
    });

  } catch (err: any) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});