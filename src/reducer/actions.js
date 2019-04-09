// 放進reducer用
export const SEARCH_BAR_TOGGLE = 'SEARCH_BAR_TOGGLE';
export const LOGIN_TO_WEB = 'LOGIN_TO_WEB';

// 放進component用
export function searchBarOpenToggle() {
    return { type: SEARCH_BAR_TOGGLE }
}

export function loginToWeb(user) {
    return { type: LOGIN_TO_WEB, user }
}