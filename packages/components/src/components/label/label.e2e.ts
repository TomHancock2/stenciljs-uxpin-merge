import { newE2EPage } from '@stencil/core/testing';

describe('test-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<test-label></test-label>');

    const element = await page.find('test-label');
    expect(element).toHaveClass('hydrated');
  });
});
