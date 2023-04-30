export function getTitleByPath(routesConfig, path) {
  const titles = []
  routesConfig.forEach((route) => {
    if (route.path === path) {
      titles.push(route.title)
    } else if (route.children && route.children.length > 0) {
      route.children.forEach((childRoute) => {
        if (childRoute.path === path) {
          titles.push(route.title)
          titles.push(childRoute.title)
        }
      })
    }
  })
  return titles
}
