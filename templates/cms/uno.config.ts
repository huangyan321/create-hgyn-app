import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
    presets: [presetUno(), presetAttributify()],
    rules: [
        // m:margin dir :left/top/right/bottom
        [
            /^m-(t|r|b|l)-([\.\d]+)$/,
            ([_, dir, num]) => ({ [`margin-${dir}`]: `${num}px` }),
        ],
        [
            /^p-(t|r|b|l)-([\.\d]+)$/,
            ([_, dir, num]) => ({ [`padding-${dir}`]: `${num}px` }),
        ],
        [/^size-([\.\d]+)$/, ([_, num]) => ({ fontSize: `${num}px` })],
    ],
});
