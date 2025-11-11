import xmlToJs from 'xml-js';

describe('Sitemap', () => {
  it('should generate sitemap', () => {
    cy.request('/sitemap.xml')
      .its('body')
      .then((body) => {
        const json = xmlToJs.xml2json(body, { compact: true });
        const urls = JSON.parse(json).urlset.url;
        expect(urls).to.have.length(25);
      });
  });
});
