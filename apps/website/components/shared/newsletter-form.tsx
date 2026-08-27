"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@/hooks/api/use-subscribe-newsletter";
import { getApiErrorMessage } from "@/lib/api/client";

type NewsletterFormProps = {
  title: string;
  description: string;
};

export function NewsletterForm({ title, description }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    subscribe.mutate(
      { email },
      {
        onSuccess: (data) => {
          setEmail("");
          toast.success(data.message ?? "You are subscribed.");
        },
        onError: (error) => {
          toast.error(
            getApiErrorMessage(error, "Could not subscribe. Please try again."),
          );
        },
      },
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex max-w-sm gap-2">
        <Input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
        />
        <Button type="submit" disabled={subscribe.isPending}>
          {subscribe.isPending ? "Sending…" : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
