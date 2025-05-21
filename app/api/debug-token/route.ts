// app/api/debug-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  
  return NextResponse.json({
    hasToken: !!token,
    role: token?.role || 'none',
    // Avoid exposing sensitive data
    tokenKeys: token ? Object.keys(token) : []
  });
}