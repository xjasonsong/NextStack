"use server";

import { updateSubscriber } from "@/server/lib/newsletter";
import { EmailSchema } from "@/lib/zod";

export async function subscribeToNewsletter(formData: FormData) {
  // Parse and validate email
  const validatedFields = EmailSchema.safeParse({
    email: formData.get("email"),
  });

  // If validation fails, return error messages
  if (!validatedFields.success) {
    throw new Error(
      validatedFields.error.issues[0]?.message ?? "Invalid email"
    );
  }

  // Subscribe to newsletter with validated email
  await updateSubscriber({
    email: validatedFields.data.email,
    active: true,
  });
}
