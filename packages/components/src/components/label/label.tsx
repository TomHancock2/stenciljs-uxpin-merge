import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'test-label',
  styleUrl: 'label.css',
  scoped: true
})
export class Label {
  render() {
    return (
      <Host>
        <label>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
