import{_ as n,c as s,o as a,a as t}from"./app.5330ff9d.js";const g='{"title":"appBar","description":"","frontmatter":{},"headers":[{"level":3,"title":"appBar","slug":"appbar"},{"level":3,"title":"useful Widget","slug":"useful-widget"},{"level":3,"title":"Image.asset vs AssetImage","slug":"image-asset-vs-assetimage"},{"level":3,"title":"Get Widget List from List Data","slug":"get-widget-list-from-list-data"}],"relativePath":"flutter.md"}',p={},e=t(`<h3 id="appbar" tabindex="-1">appBar <a class="header-anchor" href="#appbar" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/material.dart&#39;</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span>
    <span class="token keyword">const</span> <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      home<span class="token punctuation">:</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
        appBar<span class="token punctuation">:</span> <span class="token class-name">MyAppBar</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Hello World&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        body<span class="token punctuation">:</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/// https://stackoverflow.com/questions/52678469/the-appbardesign-cant-be-assigned-to-the-parameter-type-preferredsizewidget</span>
<span class="token keyword">class</span> <span class="token class-name">MyAppBar</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token keyword">implements</span> <span class="token class-name">PreferredSizeWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">MyAppBar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>required <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Size</span> <span class="token keyword">get</span> preferredSize <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token keyword">const</span> <span class="token class-name">Size</span><span class="token punctuation">.</span><span class="token function">fromHeight</span><span class="token punctuation">(</span>kToolbarHeight<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// kToolbarHeight or double</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">AppBar</span><span class="token punctuation">(</span>
      title<span class="token punctuation">:</span> <span class="token class-name">Text</span><span class="token punctuation">(</span>title<span class="token punctuation">)</span><span class="token punctuation">,</span>
      leading<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">Icon</span><span class="token punctuation">(</span><span class="token class-name">Icons</span><span class="token punctuation">.</span>menu<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyApp</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">const</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;Hello World&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="useful-widget" tabindex="-1">useful Widget <a class="header-anchor" href="#useful-widget" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code><span class="token comment">// some useful widget</span>
<span class="token class-name">SizedBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// key width height child, use for box or space</span>
<span class="token comment">// Container</span>
<span class="token class-name">Container</span><span class="token punctuation">(</span>
	decoration<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">BoxDecoration</span><span class="token punctuation">(</span>
  	color<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>deepPurple<span class="token punctuation">,</span> <span class="token comment">// container background-color</span>
    image<span class="token punctuation">:</span> <span class="token class-name">DecorationImage</span><span class="token punctuation">(</span>image<span class="token punctuation">:</span> <span class="token class-name">AssetImage</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;images/1.jpeg&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> fit<span class="token punctuation">:</span> <span class="token class-name">BoxFit</span><span class="token punctuation">.</span>cover<span class="token punctuation">)</span> <span class="token comment">// constainer background-image mode: cover</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre></div><h3 id="image-asset-vs-assetimage" tabindex="-1">Image.asset vs AssetImage <a class="header-anchor" href="#image-asset-vs-assetimage" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code><span class="token comment">/// Image is a StatefulWidget and Image.asset is just a named constructor, you can use it directly on your widget tree.</span>
<span class="token comment">///</span>
<span class="token comment">/// AssetImage is an ImageProvider which is responsible for obtaining the image of the specified path.</span>
<span class="token comment">///</span>
<span class="token comment">/// When use for image, Image.asset use as a Widget, AssetImage use as a parameter also Image.asset class use AssetImage inside</span>

<span class="token comment">// example</span>
<span class="token class-name">Row</span><span class="token punctuation">(</span>
	children<span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token class-name">Image</span><span class="token punctuation">.</span><span class="token function">asset</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;xxxxx&#39;</span></span><span class="token punctuation">)</span> <span class="token comment">// here is a widget</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">)</span>
  
<span class="token class-name">Container</span><span class="token punctuation">(</span>
	decoration<span class="token punctuation">:</span> <span class="token class-name">BoxDecoration</span><span class="token punctuation">(</span>
  	image<span class="token punctuation">:</span> <span class="token class-name">DecorationImage</span><span class="token punctuation">(</span>
    	image<span class="token punctuation">:</span> <span class="token class-name">AssetImage</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;xxxxx&#39;</span></span><span class="token punctuation">)</span> <span class="token comment">// here AssetImage just as a parameter</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre></div><h3 id="get-widget-list-from-list-data" tabindex="-1">Get Widget List from List Data <a class="header-anchor" href="#get-widget-list-from-list-data" aria-hidden="true">#</a></h3><div class="language-dart"><pre><code>
<span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> <span class="token class-name">IconData</span> icon<span class="token punctuation">;</span>
  <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">{</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>icon<span class="token punctuation">,</span> required <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Test</span><span class="token punctuation">&gt;</span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">List</span> listData <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&#39;icon&#39;</span></span><span class="token punctuation">:</span> <span class="token class-name">Icons</span><span class="token punctuation">.</span>menu<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;name&#39;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Menu&#39;</span></span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&#39;icon&#39;</span></span><span class="token punctuation">:</span> <span class="token class-name">Icons</span><span class="token punctuation">.</span>share<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;name&#39;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Share&#39;</span></span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&#39;icon&#39;</span></span><span class="token punctuation">:</span> <span class="token class-name">Icons</span><span class="token punctuation">.</span>car_rental<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;name&#39;</span></span><span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Cart&#39;</span></span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> ll <span class="token operator">=</span> listData<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token class-name">Test</span><span class="token punctuation">(</span>icon<span class="token punctuation">:</span> e<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;icon&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> e<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;name&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> ll<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Widget</span><span class="token punctuation">&gt;</span></span> <span class="token function">initWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token class-name">Column</span><span class="token punctuation">(</span>
    children<span class="token punctuation">:</span> <span class="token punctuation">[</span>
      <span class="token class-name">Icon</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>icon<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token class-name">Text</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span>
    <span class="token keyword">const</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyApp</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      home<span class="token punctuation">:</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span>
        body<span class="token punctuation">:</span> <span class="token class-name">Row</span><span class="token punctuation">(</span>
          children<span class="token punctuation">:</span> <span class="token function">initWidget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),o=[e];function c(l,u,i,k,r,m){return a(),s("div",null,o)}var f=n(p,[["render",c]]);export{g as __pageData,f as default};
