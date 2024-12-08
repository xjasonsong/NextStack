import { redirect } from "next/navigation";
import { providerMap } from "@/server/auth/config";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { signIn } from "@/server/auth";
import { AlertCircle } from "lucide-react";
import { getDictionary } from "@/server/dictionary";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const providers = Object.values(providerMap);
  const params = await searchParams;
  const callbackUrl = (params?.callbackUrl as string) ?? "";
  const error = params?.error as string | undefined;
  const dictionary = await getDictionary();

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="w-[400px]">
        {error && (
          <div className="m-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {dictionary.auth.errors.default}
          </div>
        )}
        <CardHeader className="space-y-1">
          <h1 className="text-2xl font-semibold">{dictionary.auth.title}</h1>
          <p className="text-sm text-muted-foreground">
            {dictionary.auth.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers.map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: callbackUrl,
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/signin?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <Button variant="outline" className="w-full" type="submit">
                <Image
                  src={`/logos/${provider.name.toLowerCase()}.svg`}
                  alt={provider.name}
                  className="mr-2"
                  width={16}
                  height={16}
                />
                {dictionary.auth.socialButton.replace(
                  "{provider}",
                  provider.name,
                )}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
