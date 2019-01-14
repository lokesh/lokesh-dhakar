---
layout: post.njk
title: "Squeaky clean CSS"
date: 2006-02-16
comments: true
categories:
---
I thought I'd share a little bit of what I've learned from noodling around with stylesheets these past few years. Here are some basic organizational practices I try to follow. ( Much of this might be old hat for you, and if so, just think of it as a refresher. I run into enough messy stylesheets that I thought this might be of some interest. )

### Grouping your styles

Group your styles into categories (ex. layout, typography, forms, so on) and visually seperate them in your css file. A title and table of contents doesn't hurt either:

<pre><code class="prism language-css line-numbers">/*
    HuddleTogether.com Screen Styles

    Table of Contents:
        layout
        typography
        forms
*/

/* layout
----------------------------------------------- */

/* typography
----------------------------------------------- */

/* forms
----------------------------------------------- */
</code></pre>

### Choosing your categories

Even though I do have some common practices, I don't have a 'template' for how to breakdown styles into categories.

For starters, I almost always have *layout* and *typography* categories. With *typography* defining the sitewide look and feel. Depending on the complexity, I may break out the *table* and *form* styles into their own categories.

Next, I address the physical sections of the page with their own categories: *header*, *sidebar*, *content*, and *footer* for example. Lastly, I collect the page and content section specific styles and place them in their own category (and sometimes subcategories).

### Importing stylesheets

Another method is to categorize the styles and place them in seperate CSS files which are all imported by one main CSS file. I find this method good in theory but it can lead to overlapping styles, [specification issues][1], and general confusion if you're not very careful:

 [1]: http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html

<pre><code class="prism language-css line-numbers">@import url("layout.css");
@import url("typography.css");
@import url("forms.css");
</code></pre>

### Linebreaks and indenting

When styling multiple tags, ids, or classes with common attributes, display each on its own line. Also, indent closing braces. Both these actions keep the left column clean so you can quickly skim your stylesheet:

<pre><code class="prism language-css line-numbers">h2,
h3,
h4 {
    font-weight: bold;
    padding-bottom: 1.5em;
    }
h5 {
    font-weight: normal;
    font-size: 1.5em;
    padding-bottom: 0;
    }
</code></pre>

### Descendant selectors

Use descendant selectors generously and consistently to keep your styles grouped neatly and [CSS specificity][1] in check:

<pre><code class="prism language-css line-numbers">#header {}
#header .logo {}
#header .logo img {}
</code></pre>

### Quick disable

A trick I use all the time to temporarily disable a style attribute involves simply adding an 'x' in front of the attribute name. It's safer then cutting and quicker then commenting out:

<pre><code class="prism language-css line-numbers">#footer{
    border-top: 1px solid #e5e5e5;
    xborder-bottom: 1px solid #e5e5e5;
    }
</code></pre>

### Keeping track of divs

Quick HTML pointer. For div tags that stay open for a number of lines, add a small comment after the closing tag about the opening div's id or class:

<pre><code class="prism language-html line-numbers">&#x3C;div id=&#x22;content&#x22;&#x3E;
    &#x3C;h2&#x3E;&#x3C;/h2&#x3E;
    &#x3C;p&#x3E;&#x3C;/p&#x3E;
    &#x3C;p&#x3E;&#x3C;/p&#x3E;
    &#x3C;p&#x3E;&#x3C;/p&#x3E;
    &#x3C;p&#x3E;&#x3C;/p&#x3E;
&#x3C;/div&#x3E;<!-- end #content--></code></pre>

<link rel="stylesheet" href="/css/prism.css">

<script src="/js/prism.min.js"></script>
