## Proxy

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
// /composables/useApi.ts
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

## Env

- install cross-env

  ```sh
  pnpm install cross-env -D
  ```

- add .env files

  ```sh
  #.env.development
  NODE_ENV: 'development'
  NUXT_BASE_API: 'https://buubuu.tv'
  
  #.env.test
  NODE_ENV: 'test'
  NUXT_BASE_API: ''
  
  #.env.production
  NODE_ENV: 'production'
  NUXT_BASE_API: ''
  ```

  

- change package.json script

  ```json
  // package.json
  "scripts": {
      "build:test": "cross-env NODE_ENV=test nuxt build",  // build for test
      "build:prod": "cross-env NODE_ENV=production nuxt build", // build for production
      "dev": "cross-env NODE_ENV=development nuxt dev", // server for dev
      "generate": "nuxt generate",
      "preview": "nuxt preview"
    },
  ```

  

- in nuxt.config.ts set publicRuntimeConfig

  ```ts
  import { defineNuxtConfig } from 'nuxt'
  
  // https://v3.nuxtjs.org/api/configuration/nuxt.config
  // read the environment variables and set to publicRuntimeConfig the we can use it with useRuntimeConfig()
  const { parsed: _env } = require('dotenv').config({
    path: `./.env.${process.env.NODE_ENV}`
  })
  
  console.log(process.env)  // all env variables
  
  console.log(_env) // only we set variables
  
  export default defineNuxtConfig({
    app: {
      
    },
    publicRuntimeConfig: {
      ..._env
    },
    vite: {
      server: {
        proxy: {
          '/dev-api': {
            target: _env.NUXT_BASE_API,
            changeOrigin: true,
            rewrite: (_path) => _path.replace(/^\/dev-api/, ''),
          },
        },
      }
    }
  })
  
  ```


## Server

### Api

in server we will have no problem with cros, but how to use other server api, we can do it link this

```ts
// method: get
// /server/api/home.ts  
import { useQuery } from 'h3' // can help you to get params with request
export default async (req, res) => {
  return await $fetch('https://buubuu.tv/api_v2/home', { params: useQuery(req) })
}

// /pages/xx.vue  you can get the home result with useFetch
const home = await useFetch('/api/home', { params: { name: 'TT' } })

// method: post
// /server/api/recommend.post.ts
import { useBody } from 'h3' // can help you to get body with request
export default async (req, res) => {
	return await $fetch('https://buubuu.tv/api_v2/recommend', { method: 'post', body: await useBody(req) }) // useBody need await
}

// /pages/xx.vue useFetch link this
const recommend = await useFetch('/api/recommend', { method: 'post', body: { video_id: '625e278a29921b753332f1c3' } })

```

Always we can create a public function for $fetch with server

```ts
// /server/api/utils.ts
const host = 'https://buubuu.tv/'
import { useBody, useQuery } from 'h3'
export const $post = async (url: string, req: any) => {
  return await $fetch(`${host + url}`, { method: 'post', body: await useBody(req) })
}

export const $get = async (url: string, req: any) => {
  return await $fetch(`${host + url}`, { params: useQuery(req) })
}

// then in other api we can import $post or $get to use

// /server/api/home.ts
import { $get } from './utils'
export default async (req, res) => await $get('/api_v2/home', req)

// /server/api/recommend.post.ts
import { $post } from './utils'
export default async (req, res) => await $post('/api_v2/recommend', req)
```

### mongodb

```ts
import { MongoClient } from "mongodb";

// console.log('db', MongoClient)
const uri = 'mongodb://localhost:27017/quiz'

const client = new MongoClient(uri)

// console.log('client', client)
async function run () {
  try {
    await client.connect()

    const quiz = client.db('quiz').collection('quiz')

    const ret = await quiz.findOne()

    console.log('ret', ret)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
```

