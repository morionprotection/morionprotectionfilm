import { NextResponse } from "next/server";
import { sendQuoteRequestEmail } from "@/lib/sendStatusEmail"; // Adjust path to where you saved the email function

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, city, vehicle, series } = body;

    // 1. Basic Validation
    if (!firstName || !lastName || !email || !phone || !city || !vehicle || !series) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 2. Send the Email
    await sendQuoteRequestEmail({
      firstName,
      lastName,
      email,
      phone,
      city,
      vehicle,
      series
    });

    // 3. Return Success
    return NextResponse.json(
      { message: "Quote request sent successfully." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}