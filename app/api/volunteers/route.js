import { NextResponse } from 'next/server';
import { volunteers } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(volunteers);
}
