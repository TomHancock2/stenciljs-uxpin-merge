import { newE2EPage } from '@stencil/core/testing';

describe('test-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<test-input></test-input>');

    const element = await page.find('test-input');
    expect(element).toHaveClass('hydrated');
  });
});
