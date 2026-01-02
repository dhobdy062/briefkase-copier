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

        const { webhook_url, portfolio_id } = await req.json();

        if (!webhook_url) {
            return Response.json({ error: 'webhook_url is required' }, { status: 400 });
        }

        if (!portfolio_id) {
            return Response.json({ error: 'portfolio_id is required' }, { status: 400 });
        }

        // Fetch portfolio/salesperson data
        const portfolios = await base44.entities.Salesperson.filter({ id: portfolio_id });
        
        if (!portfolios || portfolios.length === 0) {
            return Response.json({ error: 'Portfolio not found' }, { status: 404 });
        }

        const portfolio = portfolios[0];

        // Format payload for Zapier with the exact structure
        const zapierPayload = {
            portfolio_id: portfolio.id,
            full_name: portfolio.full_name || "",
            title: portfolio.title || "",
            email: portfolio.email || "",
            phone: portfolio.phone || "",
            photo_url: portfolio.photo_url || "",
            summary: portfolio.summary || "",
            resume_url: portfolio.resume_url || "",
            template: portfolio.template || "",
            skills: portfolio.skills || [],
            achievements: portfolio.achievements || [],
            hobbies: portfolio.hobbies || [],
            experience: portfolio.experience || [],
            education: portfolio.education || [],
            plan_30_60_90: portfolio.day_plan || {},
            case_study: portfolio.case_study || {}
        };

        // Send to Zapier webhook
        const zapierResponse = await fetch(webhook_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(zapierPayload)
        });

        if (!zapierResponse.ok) {
            throw new Error(`Zapier webhook failed: ${zapierResponse.statusText}`);
        }

        return Response.json({ 
            success: true,
            message: 'Portfolio data sent to Zapier successfully',
            portfolio_name: portfolio.full_name
        });

    } catch (error) {
        console.error('Error sending to Zapier:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});