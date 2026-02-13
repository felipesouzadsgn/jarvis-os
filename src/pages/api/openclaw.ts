import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { action, params } = await request.json();
    
    // Configurações do OpenClaw Gateway
    const GATEWAY_URL = 'http://localhost:18789/api';
    const TOKEN = '7e92b78980f2a1bc16ea3c5ba3a41feddf12d7468353bdee';

    // Se a ação for 'message_send', mapeamos para o comando de mensagem
    let method = action;
    let rpcParams = params || {};

    const response = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: rpcParams,
        id: Date.now()
      })
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
