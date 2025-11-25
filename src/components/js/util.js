//在后续的wps版本中，wps的所有枚举值都会通过wps.Enum对象来自动支持，现阶段先人工定义
var WPS_Enum = {
  msoCTPDockPositionLeft: 0,
  msoCTPDockPositionRight: 2
}

function GetUrlPath() {
  // 在本地网页的情况下获取路径
  if (window.location.protocol === 'file:') {
    const path = window.location.href;
    // 删除文件名以获取根路径
    return path.substring(0, path.lastIndexOf('/'));
  }

  // 在非本地网页的情况下，返回完整的目录路径（包括 /direct）
    const { protocol, hostname, port, pathname } = window.location;
    const portPart = port ? `:${port}` : '';

    // 获取当前页面所在目录（去掉文件名，保留目录路径）
    const basePath = pathname.substring(0, pathname.lastIndexOf('/') + 1);

    return `${protocol}//${hostname}${portPart}${basePath}index.html`;
}

function GetRouterHash() {
  if (window.location.protocol === 'file:') {
    return '';
  }

  return '#'  // 改为只返回 #，因为 index.html 已经包含在 GetUrlPath 中了
}

export default {
  WPS_Enum,
  GetUrlPath,
  GetRouterHash
}
