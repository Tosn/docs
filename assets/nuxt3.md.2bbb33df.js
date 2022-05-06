import{_ as n,c as s,o as a,a as t}from"./app.5330ff9d.js";const m='{"title":"Proxy","description":"","frontmatter":{},"headers":[{"level":2,"title":"Proxy","slug":"proxy"},{"level":2,"title":"Env","slug":"env"},{"level":2,"title":"Server","slug":"server"},{"level":3,"title":"Api","slug":"api"}],"relativePath":"nuxt3.md"}',p={},o=t(`<h2 id="proxy" tabindex="-1">Proxy <a class="header-anchor" href="#proxy" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token comment">// /nuxt.config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineNuxtConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nuxt&#39;</span>
<span class="token keyword">export</span> <span class="token function">defineNuxtConfig</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  vite<span class="token operator">:</span> <span class="token punctuation">{</span>
    server<span class="token operator">:</span> <span class="token punctuation">{</span>
      proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;/dev-api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          target<span class="token operator">:</span> <span class="token string">&#39;https://buubuu.tv&#39;</span><span class="token punctuation">,</span>
          changeOrigin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span>_path<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> _path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/dev-api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-vue"><pre><code><span class="token comment">&lt;!-- /pages/xx.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// here need localhost prefix, with out not work</span>
  <span class="token comment">// https://github.com/nuxt/framework/discussions/1223#discussioncomment-2584532</span>
  <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">useFetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://localhost:3000/dev-api/api_v2/home&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>allways we can create a compossables to encapsulation <code>useFecth</code> as <code>useApi</code></p><div class="language-ts"><pre><code><span class="token comment">// /composables/useApi.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">useApi</span> <span class="token operator">=</span> <span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> options<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">public</span><span class="token operator">:</span> publicConfig <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useRuntimeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> prefix <span class="token operator">=</span> publicConfig<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;development&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;http://localhost:3000&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

  <span class="token keyword">return</span> <span class="token function">useFetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prefix<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// /pages/xx.vue can use useApi example:</span>
<span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">useApi</span><span class="token punctuation">(</span><span class="token string">&#39;/dev-api/api_v2/home&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// nuxt.config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineNuxtConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nuxt&#39;</span>

<span class="token comment">// https://v3.nuxtjs.org/api/configuration/nuxt.config</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineNuxtConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  app<span class="token operator">:</span> <span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  publicRuntimeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token constant">NODE_ENV</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token punctuation">,</span>
    <span class="token constant">NUXT_BASE_API</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NUXT_BASE_API</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  vite<span class="token operator">:</span> <span class="token punctuation">{</span>
    server<span class="token operator">:</span> <span class="token punctuation">{</span>
      proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;/dev-api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          target<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NUXT_BASE_API</span><span class="token punctuation">,</span>
          changeOrigin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span>_path<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> _path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/dev-api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// /.env</span>
<span class="token constant">NUXT_BASE_API</span> <span class="token operator">=</span> <span class="token string">&#39;https://buubuu.tv&#39;</span>
</code></pre></div><h2 id="env" tabindex="-1">Env <a class="header-anchor" href="#env" aria-hidden="true">#</a></h2><ul><li><p>install cross-env</p><div class="language-sh"><pre><code>pnpm install cross-env -D
</code></pre></div></li><li><p>add .env files</p><div class="language-sh"><pre><code>#.env.development
NODE_ENV: &#39;development&#39;
NUXT_BASE_API: &#39;https://buubuu.tv&#39;

#.env.test
NODE_ENV: &#39;test&#39;
NUXT_BASE_API: &#39;&#39;

#.env.production
NODE_ENV: &#39;production&#39;
NUXT_BASE_API: &#39;&#39;
</code></pre></div></li><li><p>change package.json script</p><div class="language-json"><pre><code><span class="token comment">// package.json</span>
<span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build:test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross-env NODE_ENV=test nuxt build&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// build for test</span>
    <span class="token property">&quot;build:prod&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross-env NODE_ENV=production nuxt build&quot;</span><span class="token punctuation">,</span> <span class="token comment">// build for production</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cross-env NODE_ENV=development nuxt dev&quot;</span><span class="token punctuation">,</span> <span class="token comment">// server for dev</span>
    <span class="token property">&quot;generate&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nuxt generate&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;nuxt preview&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div></li><li><p>in nuxt.config.ts set publicRuntimeConfig</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineNuxtConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nuxt&#39;</span>

<span class="token comment">// https://v3.nuxtjs.org/api/configuration/nuxt.config</span>
<span class="token comment">// read the environment variables and set to publicRuntimeConfig the we can use it with useRuntimeConfig()</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> parsed<span class="token operator">:</span> _env <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;dotenv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  path<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">./.env.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">)</span>  <span class="token comment">// all env variables</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_env<span class="token punctuation">)</span> <span class="token comment">// only we set variables</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineNuxtConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  app<span class="token operator">:</span> <span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  publicRuntimeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>_env
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  vite<span class="token operator">:</span> <span class="token punctuation">{</span>
    server<span class="token operator">:</span> <span class="token punctuation">{</span>
      proxy<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;/dev-api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          target<span class="token operator">:</span> _env<span class="token punctuation">.</span><span class="token constant">NUXT_BASE_API</span><span class="token punctuation">,</span>
          changeOrigin<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span>_path<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> _path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/dev-api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div></li></ul><h2 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-hidden="true">#</a></h2><h3 id="api" tabindex="-1">Api <a class="header-anchor" href="#api" aria-hidden="true">#</a></h3><p>in server we will have no problem with cros, but how to use other server api, we can do ti link this</p><div class="language-ts"><pre><code><span class="token comment">// method: get</span>
<span class="token comment">// /server/api/home.ts  </span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useQuery <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;h3&#39;</span> <span class="token comment">// can help you to get params with request</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">$fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://buubuu.tv/api_v2/home&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> params<span class="token operator">:</span> <span class="token function">useQuery</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// /pages/xx.vue  you can get the home result with useFetch</span>
<span class="token keyword">const</span> home <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">useFetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/home&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> params<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;TT&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// method: post</span>
<span class="token comment">// /server/api/recommend.post.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useBody <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;h3&#39;</span> <span class="token comment">// can help you to get body with request</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">$fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://buubuu.tv/api_v2/recommend&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">,</span> body<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">useBody</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// useBody need await</span>
<span class="token punctuation">}</span>

<span class="token comment">// /pages/xx.vue useFetch link this</span>
<span class="token keyword">const</span> recommend <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">useFetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/recommend&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">,</span> body<span class="token operator">:</span> <span class="token punctuation">{</span> video_id<span class="token operator">:</span> <span class="token string">&#39;625e278a29921b753332f1c3&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div><p>Always we can create a public function for $fetch with server</p><div class="language-ts"><pre><code><span class="token comment">// /server/api/utils.ts</span>
<span class="token keyword">const</span> host <span class="token operator">=</span> <span class="token string">&#39;https://buubuu.tv/&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useBody<span class="token punctuation">,</span> useQuery <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;h3&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">$post</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> req<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">$fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>host <span class="token operator">+</span> url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">&#39;post&#39;</span><span class="token punctuation">,</span> body<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">useBody</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">$get</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> req<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">$fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>host <span class="token operator">+</span> url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> params<span class="token operator">:</span> <span class="token function">useQuery</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// then in other api we can import $post or $get to use</span>

<span class="token comment">// /server/api/home.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> $get <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./utils&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> <span class="token function">$get</span><span class="token punctuation">(</span><span class="token string">&#39;/api_v2/home&#39;</span><span class="token punctuation">,</span> req<span class="token punctuation">)</span>

<span class="token comment">// /server/api/recommend.post.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> $post <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./utils&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">await</span> <span class="token function">$post</span><span class="token punctuation">(</span><span class="token string">&#39;/api_v2/recommend&#39;</span><span class="token punctuation">,</span> req<span class="token punctuation">)</span>
</code></pre></div>`,13),e=[o];function c(u,l,i,k,r,d){return a(),s("div",null,e)}var v=n(p,[["render",c]]);export{m as __pageData,v as default};
