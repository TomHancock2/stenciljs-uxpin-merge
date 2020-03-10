import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'test-input',
  styleUrl: 'input.css',
  scoped: true
})
export class Input {

  @Prop() placeholder?: string;

  render() {
    return (
      <Host>
        <input type="text" placeholder={this.placeholder} />
      </Host>
    );
  }

}
