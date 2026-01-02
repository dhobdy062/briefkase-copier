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

        const { webhook_url, candidate_id, include_interviews } = await req.json();

        if (!webhook_url) {
            return Response.json({ error: 'webhook_url is required' }, { status: 400 });
        }

        if (!candidate_id) {
            return Response.json({ error: 'candidate_id is required' }, { status: 400 });
        }

        // Fetch candidate data
        const candidates = await base44.entities.Candidate.filter({ id: candidate_id });
        
        if (!candidates || candidates.length === 0) {
            return Response.json({ error: 'Candidate not found' }, { status: 404 });
        }

        const candidate = candidates[0];
        let interviews = [];

        // Optionally include interviews
        if (include_interviews) {
            interviews = await base44.entities.Interview.filter({ candidate_id });
        }

        // Prepare payload for Zapier
        const zapierPayload = {
            candidate: candidate,
            interviews: interviews,
            sent_at: new Date().toISOString(),
            sent_by: user.email
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
            message: 'Data sent to Zapier successfully',
            candidate_name: candidate.full_name
        });

    } catch (error) {
        console.error('Error sending to Zapier:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});