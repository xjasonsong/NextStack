import { env } from "@/env";
import { db } from "@/server/db";

export async function getSubscriberByEmail(email: string) {
  return await db.newsletterSubscription.findFirst({
    where: {
      email,
    },
  });
}

export async function updateSubscriber({
  email,
  active,
}: {
  email: string;
  active: boolean;
}) {
  if (active) {
    // Subscribe and get subscription ID from Beehiiv
    const subscriptionId = await subscribeToBeehiiv(email);

    await db.newsletterSubscription.upsert({
      where: {
        email: email,
      },
      create: {
        email: email,
        active: active,
        externalSubscriptionId: subscriptionId,
      },
      update: {
        active: active,
        externalSubscriptionId: subscriptionId,
      },
    });
  } else {
    // Get existing subscriber to fetch subscription ID
    const subscriber = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (subscriber?.externalSubscriptionId) {
      await unsubscribeFromBeehiiv(subscriber.externalSubscriptionId);
    }

    await db.newsletterSubscription.update({
      where: { email },
      data: {
        active: false,
      },
    });
  }
}

interface BeehiivResponse {
  data: {
    id: string;
  };
}

export async function subscribeToBeehiiv(
  email: string,
): Promise<string | null> {
  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
    return Promise.resolve(null);
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to subscribe: ${await response.text()}`);
  }

  const data = (await response.json()) as BeehiivResponse;
  return data.data.id;
}

export async function unsubscribeFromBeehiiv(subscriptionId: string) {
  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
    return Promise.resolve();
  }
  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions/${subscriptionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        unsubscribe: true,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to unsubscribe: ${await response.text()}`);
  }
}
