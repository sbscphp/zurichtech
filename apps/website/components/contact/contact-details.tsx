"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { useSiteSettings } from "@/hooks/sanity/use-site-settings";
import {
  FALLBACK_SITE_SETTINGS,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";

type ContactDetailsProps = {
  initialData?: SiteSettingsContent;
};

export function ContactDetails({ initialData }: ContactDetailsProps) {
  const { data = FALLBACK_SITE_SETTINGS } = useSiteSettings(initialData);

  return (
    <dl className="space-y-6">
      <Detail
        icon={<Mail className="size-4" />}
        label="Email"
        value={data.contactEmail}
        href={`mailto:${data.contactEmail}`}
      />
      <Detail
        icon={<Phone className="size-4" />}
        label="Phone"
        value={data.contactPhone}
        href={`tel:${data.contactPhone.replace(/\s+/g, "")}`}
      />
      <Detail
        icon={<MapPin className="size-4" />}
        label="Office"
        value={data.contactAddress}
      />
    </dl>
  );
}

function Detail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1 text-sm">
          {href ? (
            <a href={href} className="underline-offset-4 hover:underline">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}
