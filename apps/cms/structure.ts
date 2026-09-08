import type { StructureResolver } from "sanity/structure";

/** Singletons are edited in place; collections get a document list. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Services Page")
        .child(
          S.document().schemaType("servicesPage").documentId("servicesPage"),
        ),
      S.documentTypeListItem("service").title("Services"),
      S.listItem()
        .title("Blogs Page")
        .child(S.document().schemaType("blogsPage").documentId("blogsPage")),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.listItem()
        .title("Why Choose Us Page")
        .child(
          S.document()
            .schemaType("whyChooseUsPage")
            .documentId("whyChooseUsPage"),
        ),
      S.listItem()
        .title("Contact Page")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.listItem()
        .title("Partners Page")
        .child(
          S.document().schemaType("partnersPage").documentId("partnersPage"),
        ),
      S.listItem()
        .title("Projects Page")
        .child(
          S.document().schemaType("projectsPage").documentId("projectsPage"),
        ),
      S.documentTypeListItem("project").title("Projects"),
      S.listItem()
        .title("Legal Page")
        .child(S.document().schemaType("legalPage").documentId("legalPage")),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
