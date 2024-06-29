import { NextResponse } from 'next/server';

let trackingData = [];

export async function POST(req) {
  try {
    const { event, data } = await req.json();
    const trackedEvent = { event, data, timestamp: new Date() };
    trackingData.push(trackedEvent);
    console.log('Tracked Event:', trackedEvent);
    return NextResponse.json({ message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event', error }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(trackingData);
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    return NextResponse.json({ message: 'Error fetching tracking data', error }, { status: 500 });
  }
}
