export default class Router {
  routes = {};

  add(routeName, href) {
    this.routes[routeName] = href;
  }

  showRoutes() {
    console.log(this.routes);
  }

  route(event) {
    console.log('routed');

    // if you don't find the event, select the window event
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle() {
    // Pathname: current address
    const { pathname } = window.location;

    // Route: What it should look for based on the pathname
    console.log(pathname);
    console.log('routes', this.routes);
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector('#app').innerHTML = html;
      });
  }
}
