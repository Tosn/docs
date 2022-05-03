### Proxy

```ts
// /nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'
export defineNuxtConfig ({
  vite: {
    server: {
      proxy: {
        '/dev-api': {
          target: 'https://buubuu.tv',
          changeOrigin: true,
          rewrite: (_path) => _path.replace(/^\/dev-api/, ''),
        },
      },
    }
  }
})
```

```vue
<!-- /pages/xx.vue -->
<script setup>
  // here need localhost prefix, with out not work
  // https://github.com/nuxt/framework/discussions/1223#discussioncomment-2584532
  const ret = await useFetch('http://localhost:3000/dev-api/api_v2/home')
</script>
```

allways we can create a compossables to encapsulation  <code>useFecth</code>  as <code>useApi</code>

```ts
// /compossables/useApi.ts
export const useApi = (url: string, options?: any) => {
  const { public: publicConfig } = useRuntimeConfig()
  
  const prefix = publicConfig.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

  return useFetch(`${prefix}${url}`, options)
}

// /pages/xx.vue can use useApi example:
const ret = await useApi('/dev-api/api_v2/home')

// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    NUXT_BASE_API: process.env.NUXT_BASE_API
  },
  vite: {
    server: {
      proxy: {
        '/dev-api': {
          target: process.env.NUXT_BASE_API,
          changeOrigin: true,
          rewrite: (_path) => _path.replace(/^\/dev-api/, ''),
        },
      },
    }
  }
})

// /.env
NUXT_BASE_API = 'https://buubuu.tv'
```

