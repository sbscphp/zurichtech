import { sanityFetch } from "./fetch";
import { aboutPageQuery } from "./queries";
import { mapStrings } from "./types";

export type ValueItem = {
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type AboutPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  storyTitle: string;
  storyBody: string[];
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  values: ValueItem[];
  team: TeamMember[];
};

export const FALLBACK_ABOUT_PAGE: AboutPageContent = {
  heroEyebrow: "About us",
  heroTitle: "A small team with a long attention span.",
  heroDescription:
    "Zuritech is a product engineering studio. We work with founders and in-house teams to take software from an idea to something people rely on.",
  storyTitle: "Our story",
  storyBody: [
    "Zuritech started as a two-person contract team and grew into a studio that handles product, platform, and data work end to end.",
    "We keep engagements small on purpose. Fewer clients, more context, and enough time to do the unglamorous parts properly.",
  ],
  missionTitle: "Mission",
  missionBody:
    "Build software our clients can hand to their own engineers without an apology.",
  visionTitle: "Vision",
  visionBody:
    "To be the engineering partner teams call first when the work actually has to hold up.",
  values: [
    {
      title: "Ship small",
      description:
        "Short cycles, reviewable changes, and a working deployment at every step.",
    },
    {
      title: "Own the outcome",
      description:
        "We measure ourselves on whether the thing works in production, not on hours billed.",
    },
    {
      title: "Leave it readable",
      description:
        "Documentation, tests, and code your team can pick up without us in the room.",
    },
  ],
  team: [
    {
      name: "Add your first team member",
      role: "Studio",
      bio: "Team members are managed in the CMS under About Page → Team.",
    },
  ],
};

type SanityValueItem = { title?: string; description?: string };
type SanityTeamMember = { name?: string; role?: string; bio?: string };

type SanityAboutPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  storyTitle?: string;
  storyBody?: string[];
  missionTitle?: string;
  missionBody?: string;
  visionTitle?: string;
  visionBody?: string;
  values?: SanityValueItem[];
  team?: SanityTeamMember[];
};

function mapValues(
  values: SanityValueItem[] | undefined,
  fallback: ValueItem[],
): ValueItem[] {
  const mapped =
    values
      ?.map((item) => {
        const title = item.title?.trim();
        const description = item.description?.trim();
        return title && description ? { title, description } : null;
      })
      .filter((item): item is ValueItem => item !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapTeam(
  team: SanityTeamMember[] | undefined,
  fallback: TeamMember[],
): TeamMember[] {
  const mapped =
    team
      ?.map((member) => {
        const name = member.name?.trim();
        if (!name) return null;
        return {
          name,
          role: member.role?.trim() || "",
          bio: member.bio?.trim() || "",
        };
      })
      .filter((member): member is TeamMember => member !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapAboutPage(doc: SanityAboutPage | null): AboutPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_ABOUT_PAGE;

  return {
    heroEyebrow: doc.heroEyebrow?.trim() || FALLBACK_ABOUT_PAGE.heroEyebrow,
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_ABOUT_PAGE.heroDescription,
    storyTitle: doc.storyTitle?.trim() || FALLBACK_ABOUT_PAGE.storyTitle,
    storyBody: mapStrings(doc.storyBody, FALLBACK_ABOUT_PAGE.storyBody),
    missionTitle:
      doc.missionTitle?.trim() || FALLBACK_ABOUT_PAGE.missionTitle,
    missionBody: doc.missionBody?.trim() || FALLBACK_ABOUT_PAGE.missionBody,
    visionTitle: doc.visionTitle?.trim() || FALLBACK_ABOUT_PAGE.visionTitle,
    visionBody: doc.visionBody?.trim() || FALLBACK_ABOUT_PAGE.visionBody,
    values: mapValues(doc.values, FALLBACK_ABOUT_PAGE.values),
    team: mapTeam(doc.team, FALLBACK_ABOUT_PAGE.team),
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const doc = await sanityFetch<SanityAboutPage | null>(aboutPageQuery);
  return mapAboutPage(doc);
}
