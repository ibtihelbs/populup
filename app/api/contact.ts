// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "../sanity/sanityConfig";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Save to Sanity
    await sanityClient.create({
      _type: "contactMessage",
      name,
      email,
      message,
    });

    // 2️⃣ Send email
    await resend.emails.send({
      from: "Website <contact@yourdomain.com>",
      to: ["ibtihel.bensalah@outlook.fr"],
      subject: `New contact from ${name}`,
      replyTo: email,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
