import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

// import iconArrowCarrot from "@ribajs/iconset/dist/svg/arrow_carrot.svg?url";

export class LgPersonComponent extends Component {
  public static tagName = "lg-person";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {

  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(LgPersonComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no child's already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./person.component.pug"
      );
      return template();
    }
  }
}
