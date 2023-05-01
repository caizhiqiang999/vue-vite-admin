export function getNavByPath(routesConfig, path) {
  for (let item of routesConfig) {
    if (item.path === path) {
      return item.title
    } else if (item.children && item.children.length > 0) {
      let title = getNavByPath(item.children, path)
      if (title) {
        return title
      }
    }
  }
  return ''
}

export function getPathByTitle(routesConfig, title) {
  for (let item of routesConfig) {
    if (item.title === title) {
      return item.path
    } else if (item.children && item.children.length > 0) {
      let path = getPathByTitle(item.children, title)
      if (path) {
        return path
      }
    }
  }
  return ''
}
