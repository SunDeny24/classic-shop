// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config'; // [1] ESLint 순정 설정 도구 도입
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default defineConfig([
    // [2] Next.js 구식 설정을 신식(Flat)으로 변환 후 펼침
    ...compat.extends('next/core-web-vitals'),

    // [3] TS 권장 설정들을 명시적으로 펼쳐서 삽입
    ...tseslint.configs.recommended,

    {
        // [4] 무시할 파일 설정
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },

    {
        // [5] TS 파일 전용 규칙 커스텀
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser, // TS 구문 분석기 명시
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
]);
