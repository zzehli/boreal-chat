export const RoleObject = {
    USER: 'user',
    ASSISTANT: 'assistant'
} as const;

export type Role = typeof RoleObject[keyof typeof RoleObject];

export interface Message {
    role: Role,
    content: string
}
