export function getBreadcrumbDataByPath(routesConfig, path) {
  for (let i = 0; i < routesConfig.length; i++) {
    const route = routesConfig[i]
    if (route.path === path) {
      return [route.title]
    } else if (route.children && route.children.length > 0) {
      const result = getBreadcrumbDataByPath(route.children, path)
      if (result) {
        return [route.title, ...result]
      }
    }
  }
  return null
}
