import { newE2EPage } from '@stencil/core/testing';

describe('test-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<test-field></test-field>');

    const element = await page.find('test-field');
    expect(element).toHaveClass('hydrated');
  });
});
