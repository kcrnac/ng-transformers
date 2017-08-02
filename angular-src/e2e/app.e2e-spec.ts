import { NgTransformersPage } from './app.po';

describe('ng-transformers App', () => {
  let page: NgTransformersPage;

  beforeEach(() => {
    page = new NgTransformersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
