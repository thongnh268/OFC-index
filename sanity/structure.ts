import type { StructureResolver } from 'sanity/structure';

// Singletons open straight into their single document; lists below for repeatable types.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Subsidiaries Network')
        .id('subsidiaries')
        .child(S.document().schemaType('subsidiaries').documentId('subsidiaries')),
      S.divider(),
      S.documentTypeListItem('recruitmentJob').title('Recruitment Jobs'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
    ]);
