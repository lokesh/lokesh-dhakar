const template = document.createElement('template');

template.innerHTML = `
  <style>
    @import '/css/vars.css';

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .radio-button {
      --color: black;
    }

    .radio-button:hover .radio-button-label,
    .radio-button--checked .radio-button-label {
      color: white;
      background: var(--color);
    }

    .radio-button-control {
      *display: none;*
    }

    .radio-button-label {
      display: inline-flex;
      align-items: center;
      padding: 0 0.6em 0;
      height: var(--form-control-height-xs);
      margin-right: 0.25em;
      font-size: 0.9375rem;
      font-weight: var(--weight-bold);
      border-radius: var(--radius);
      border: 2px solid var(--color);
      cursor: pointer;
      color: var(--color);
    }

    @media (min-width: 800px) {
      .radio-button-label {
        font-size: 0.8125rem;
        height: var(--form-control-height);
      }
    }

    /* Way to style slot only if present. */
    ::slotted([slot="icon"]) {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

  </style>

  <div class="radio-button">
    <input type="radio" class="radio-button-control"></input>
    <label class="radio-button-label">
      <slot name="icon"></slot>
      <slot name="label">...</slot>
    </label>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$root = this._shadowRoot.querySelector('.radio-button');
    this.$control = this._shadowRoot.querySelector('.radio-button-control');
    this.$label = this._shadowRoot.querySelector('label');

    this.$control.addEventListener('change', (e) => {
      const event = new CustomEvent('pop');
      this.dispatchEvent(event);
      if (this.onpop) {
        this.onpop()
      };
    });
  }

  get name() {
    return this.getAttribute('name');
  }

  get checked() {
    return this.getAttribute('checked');
  }

  get color() {
    return this.getAttribute('color');
  }

  static get observedAttributes() {
    return ['name', 'checked', 'color'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$control.setAttribute('name', this.name);
    this.$control.checked = this.checked;
    this.$root.style.setProperty('--color', this.color);
  }
}

window.customElements.define('radio-button', Button);
