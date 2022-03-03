import { post, get } from "~/static/js/api";
import Vue from 'vue';
import ElementUI from 'element-ui';

export const state = () => ({
    login: false,
    profile: {},
    authority_list: [],
    role_level: [
        {
            label: "1级，未认证用户",
            value: 1,
        },
        {
            label: "2级，普通用户(认证身份成员)",
            value: 2,
        },
        {
            label: "3级，核心成员",
            value: 3,
        },
        {
            label: "4级，管理员",
            value: 4,
        },
        {
            label: "5级，高级管理员",
            value: 5,
        },
        {
            label: "6级，超级管理员",
            value: 6,
        },
    ],
})

export const getters = {
    // 获取用户权限等级
    getUserRoleLevel(state) {
        return state.profile.roleInfo.level
    },
    // 通用权限判断
    getUserHasAuthority: (state) => (apps, funcs, permission, level) => {
        switch (apps) {
            // 应用管理
            case 'app':
                // 新增应用
                if (funcs === 'create'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
                // 删除应用
                if (funcs === 'delete'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
                // 权限管理跳转
                if (funcs === 'changeFunc'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
            case 'func':
                // 新增功能
                if (funcs === 'create'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
                // 删除功能
                if (funcs === 'delete'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
            case 'role':
                // 新增功能
                if (funcs === 'create'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
                // 删除功能
                if (funcs === 'delete'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined) {
                    return true
                }
                // 向下授权
                if (funcs === 'down'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined
                    && level < state.profile.roleInfo.level) {
                    return true
                }
                // 自行授权
                if (funcs === 'self'
                    && state.authority_list.find(authority => authority.permission === permission)
                    !== undefined
                    && level === state.profile.roleInfo.level) {
                    return true
                }
        }


        // if (state.authority_list.find(authority => authority.permission === permission) != undefined) {
        //     return true
        // }
        return false
    },
    // 获取等级信息
    getLevelInfo: (state) => (level) => {
        let level_info;
        state.role_level.forEach((element) => {
            if (element.value == level) {
                level_info = element.label;
            }
        });
        return level_info
    }
}

export const mutations = {
    // 账户登录状态
    profileInfo(state, data) {
        state.login = true
        state.profile = data
        state.authority_list = data.authorityInfoList
    },
    // 登录错误
    errorLogin(state) {
        state.login = false
    },
}

export const actions = {
    // 账户登录状态
    profile({ commit }) {
        get("/api/user/isLogin").then((response) => {
            if (response.data.Status == 1) {
                commit('profileInfo', response.data.Result)
                if (this.$router.app._route.name === 'index') {
                    this.$router.push({ path: "/admin" });
                }
            } else {
                commit('errorLogin')
                this.$router.push({ path: "/" });
                ElementUI.Notification.error({
                    title: "未登录",
                    position: "bottom-right",
                    message:
                        response.data.Result.msg != null
                            ? response.data.Result.msg
                            : response.data.Result,
                });
            }
        });
    },
}

