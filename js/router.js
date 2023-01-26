export default class Router {
  routes = {};

  add(routeName, href) {
    this.routes[routeName] = href;
  }

  showRoutes() {
    console.log(this.routes);
  }

  route(event) {
    // if you don't find the event, select the window event
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }

  handle = () => {
    // Pathname: current address
    const { pathname } = window.location;

    console.log('Pathname', pathname);

    // Route: What it should look for based on the pathname

    const route = this.routes[pathname] || this.routes[404];
    console.log('Route', route);

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector('#app').innerHTML = html;
      });
  };
}
