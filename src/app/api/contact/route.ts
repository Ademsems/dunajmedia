import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Dunajmedia Contact Form <onboarding@resend.dev>',
      to: 'info@dunajmedia.sk',
      reply_to: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 10px;">
            New Message — Dunajmedia Contact Form
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8892B0; width: 140px;"><strong>Name</strong></td>
              <td style="padding: 10px 0; color: #0A192F;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8892B0;"><strong>Email</strong></td>
              <td style="padding: 10px 0; color: #0A192F;">
                <a href="mailto:${email}" style="color: #64FFDA;">${email}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; color: #8892B0;"><strong>Company</strong></td>
              <td style="padding: 10px 0; color: #0A192F;">${company}</td>
            </tr>` : ''}
            ${service ? `
            <tr>
              <td style="padding: 10px 0; color: #8892B0;"><strong>Service</strong></td>
              <td style="padding: 10px 0; color: #0A192F;">${service}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #8892B0; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 10px 0; color: #0A192F; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #8892B0;">
            This email was sent from the contact form at dunajmedia.sk
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
