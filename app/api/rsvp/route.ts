import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { name, email, attendance, guests, message } = await request.json();

    console.log('RSVP received:', { name, email, attendance, guests });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = `New RSVP from ${name}`;
    const body = `
      Name: ${name}
      Email: ${email}
      Attending: ${attendance === 'yes' ? 'Yes' : 'No'}
      ${attendance === 'yes' ? `Number of guests: ${guests}` : ''}
      Message: ${message || 'None'}
    `;

    console.log('Sending email to:', process.env.NOTIFICATION_EMAIL || 'to: jonathankibulungu@gmail.com',);

    const emailResponse = await resend.emails.send({
      from: 'Trou Fc <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'to: jonathankibulungu@gmail.com',
      subject,
      text: body,
    });

    console.log('Resend response:', emailResponse);

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error) {
    console.error('RSVP email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to send email', details: errorMessage }, { status: 500 });
  }
}