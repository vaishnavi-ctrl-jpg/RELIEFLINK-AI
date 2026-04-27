import { NextResponse } from 'next/server';
import { getRequests, addRequest } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(getRequests());
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newRequest = addRequest(data);
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create request' }, { status: 400 });
  }
}
