export interface command_info {
    args: {
        required: number;
        optional: number;
    }
}

export const COMMAND_LIST = new Map<string, command_info>([
    ["look", { args: { required: 0, optional: 1 } }],
    ["feed", { args: { required: 2, optional: 0 } }],
    ["read", { args: { required: 1, optional: 1 } }],
])