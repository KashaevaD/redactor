import { RedPage } from './app.po';

describe('red App', function() {
  let page: RedPage;

  beforeEach(() => {
    page = new RedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
