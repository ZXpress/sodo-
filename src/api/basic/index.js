import request from "@/utils/request";
import qs from "qs";

// 基础模块信息列表
export function getBasicList() {
  return request({
    url: "/admin/module/basic/list",
    method: "get",
  });
}

// 基础模块信息编辑
export function setBasicList(params) {
  return request({
    url: "/admin/module/basic/edit",
    method: "post",
    params,
  });
}

// 获取单个模块信息
export function getBasicListId(moduleId) {
  return request({
    url: `/admin/module/get/${moduleId}`,
    method: "get",
  });
}

// 删除单个模块信息
export function delateBasicList(moduleId) {
  return request({
    url: "/admin/module/delete/" + moduleId,
    method: "get",
  });
}

// 其他模块信息列表
export function getOtherList(type) {
  return request({
    url: "/admin/module/more/list/" + type,
    method: "get",
  });
}

// 编辑其他模块信息(非基础模块使用)
export function moduleMoreEdit(params) {
  return request({
    url: "/admin/module/more/edit",
    method: "post",
    data: qs.stringify(params),
  });
  // request.post("/admin/module/more/edit", qs.stringify(params));
}

// 获取默认子项信息
export function moduleItemDefault() {
  return request({
    url: "/admin/module/item/default",
    method: "get",
  });
}

// 获取模块编码
export function moduleCode() {
  return request({
    url: "/admin/module/code",
    method: "get",
  });
}
