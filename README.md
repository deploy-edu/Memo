## 시작하기 (Getting Started)

### 사전 준비 사항

- **Node.js**: nodejs lts 버전 (최신 버전 권장)
- **npm** 또는 **yarn**: 패키지 설치 및 스크립트 실행
- **Expo CLI**: 전역 설치 권장
  ```bash
  npm install --global expo-cli

  ```

### 설치 및 실행

1. 리포지 토리 클론(다운로드)

```
git clone https://github.com/deploy-edu/Memo.git
```

2. 폴더로 이동

```
cd Memo
```

3. 필요한 패키지 설치

```
npm install
```

4. env.development.local 추가

```
EXPO_PUBLIC_SUPABASE_URL=URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=ANON_KEY
```

5. 각 OS별 실행

```
# ios 실행 시
npm run ios

# android 실행시
npm run android
```
