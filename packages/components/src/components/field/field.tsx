import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'test-field',
  styleUrl: 'field.css',
  scoped: true
})
export class Field {
  render() {
    return (
      <Host class="field">
        <div class="field-wrapper">
          <test-label>A LABEL</test-label>
          <div class="input-container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
