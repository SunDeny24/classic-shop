// eslint.config.mjs
import nextVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint'; // 반드시 포함되어야 함!

const eslintConfig = [
    // 1. Next.js 기본 설정 (펼쳐서 넣기)
    ...nextVitals,

    // 2. TypeScript 권장 설정 (펼쳐서 넣기 - 서비스단 TS를 위해 필수!)
    ...tseslint.configs.recommended,

    // 3. 무시 설정 (globalIgnores 대신 이 방식을 쓰면 순환 참조 에러가 안 납니다)
    {
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },

    // 4. TS 파일 전용 규칙 (우리가 약속한 설정)
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];

export default eslintConfig;
