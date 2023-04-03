export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  
  addItem(element) {
    this._container.append(element);
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach((item) =>
      this._renderer(item)
    );
  }
}
