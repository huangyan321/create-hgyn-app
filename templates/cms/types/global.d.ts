interface Window {
    $loading: unknown;
    $message: any | unknown;
    $dialog: unknown;
    // 语言
    $t: unknown;
    $vue: unknown;
    // 键盘按键记录
    $KeyboardActive?: { [T: string]: boolean };
    // 编辑 JSON 的存储对象
    opener: unknown;
}

declare type Recordable<T = unknown> = Record<string, T>;
