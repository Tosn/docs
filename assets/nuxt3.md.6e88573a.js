import{_ as n,c as s,o as a,a as t}from"./app.5330ff9d.js";const m='{"title":"Proxy","description":"","frontmatter":{},"headers":[{"level":3,"title":"Proxy","slug":"proxy"}],"relativePath":"nuxt3.md"}',p={},o=t(`<h3 id="proxy" tabindex="-1">Proxy <a class="header-anchor" href="#proxy" aria-hidden="true">#</a></h3><div class="language-ts"><pre><code><span class="token comment">// /nuxt.config.ts</span>
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
</code></pre></div><p>allways we can create a compossables to encapsulation <code>useFecth</code> as <code>useApi</code></p><div class="language-ts"><pre><code><span class="token comment">// /compossables/useApi.ts</span>
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
</code></pre></div>`,5),e=[o];function c(u,l,i,k,r,g){return a(),s("div",null,e)}var x=n(p,[["render",c]]);export{m as __pageData,x as default};
