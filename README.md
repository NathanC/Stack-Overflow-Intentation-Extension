# Stack Overflow Indentaion++

A web extension (For Firefox and Chrome) that enabled rich IDE-like tabbing and tab-shifting when editing questions/answers in Stack Overflow and Meta Stack Overflow. 

It uses spaces (not tab characters) when you tab, and defaults to 4 spaces. It also adds a pretty gradient border to the text area.

Click on the extention in your toolbar to open up the settings, where you can change the spaces-per-tab, disable the border gradient, and disable the whole extention temporarily if you'd like.

(In Chrome you may not see the extention in your toolbar right away, but can find it by clicking the puzzle icon and pinning it.)

# AppStore Link

This is currently published on the Firefox Add-On Store.
* Firefox Add-On Link

It is not published for Chrome, because of privacy considerations. However, it's easy to install:
1. Clone this repo, or download and unzip the "dist-v3" folder
2. Go to `chrome://extensions/` in Chrome, select "Load Unpacked", and selected the `dist-v3` folder.
3. Profit!

# Why?

I've been using Stack Overflow quite a lot recently, and am constantly frustrated by indentation and formatting. I'm used to IDEs, my muscle memory wants to tab and shift-tab. It makes code editing a lot easier.

Also, this was a fun project! Web Extensions seem really powerful, and it's nice being able to use TypeScript and React for them.

# Context

This came out of a [post I made asking for this feature](https://meta.stackoverflow.com/questions/420863/stack-overflow-text-input-should-have-basic-ide-like-tabbing-indentation-support) on Meta Stack Overflow. This lead me down the rabbit hole, to a [post made by Marco Bonelli](https://meta.stackoverflow.com/questions/290026/markdown-editor-indent-and-outdent-functionality) in 2015, asking for the same feature. However, he actually implemented tab/tab-shift editing for TextAreas! 

You can see his CodePen [here](https://codepen.io/MeBeiM/pen/ogrmBP/). As for the code, he said
> It's just sixty lines of code so I don't see the need of any copyright/license/attribution, I just wanted to share it with my fellow programmers here on Stack Overflow :)

Well, I'm going to attribute him anyway. I've converted it to TypeScript, but kept that file unlicensed. The rest of this project is MIT licensed, and can be freely used or contributed to.

# Important note

**This extension will soon not be needed, thankfully!** [Stacks Editor](https://github.com/StackExchange/Stacks-Editor), the future engine for editing text on stack exchange, has [already merged](https://github.com/StackExchange/Stacks-Editor/pull/137) rich tab intenting in code blocks. On [Meta Stack Overflow](https://meta.stackoverflow.com/) you can enable the beta editor in your settings, and play around with it (though it only works in answers, not questions). This extension won't override any of the new editor's behavior, as it doesn't use a TextArea.

It was fun to create this though, and I hope it's useful for people until the new editor goes live!

# Building

I used Parcel, TypeScript, and React for this. I based my inital structure on [this blog post](https://areknawo.com/modern-web-extension-development-with-typescript/), but upgraded to Parcel v2, with a [recipe for web extensions](https://parceljs.org/recipes/web-extension/). It works quite nicely.

The npm scripts are:
```
npm run watch-v2 // bundles in the dev-dist-v2 directory, and watches for changes
npm run build-v2 // bundles in the dist-v2 directory, for packing for Firefox, uses the v2 manifest
npm run build-v3 // bundles in the dist-v3 directory, for packing for Chrome (and hypothetically Edge), uses the v3 manifest
```

To develop, run `npm run watch-v2`, and then in another terminal run `npx web-ext run --source-dir ./dev-dist-v2`. You can optionally add the `--firefox-profile` flag and pass in your profile directory, so that the browser instance that's opened copies your profile and you have all your other extensions and cookies. However, it takes a bit to copy over the profile.

To publish, run the two build scripts, and package the resulting directory in whatever way the store you're uploading to.
s
If you want to publish a fork, please rename it and use a different Extension ID.

# TODO

Some of the tabbing semantics aren't quite what I'd expect. It doesn't remove tabs at the begining of the line if your cursor is in the middle of the line, and you need to select the whole first line for shift-tab to work on the first line.

(for now, just make sure to select the line above whatever you want to indent/de-indent, or start at the first space character on the first line)

# Credits

The core logic for adding tab support to text areas comes from [Marco Bonelli](https://meta.stackoverflow.com/users/3889449/marco-bonelli)'s [excellent CodePen](https://codepen.io/MeBeiM/pen/ogrmBP/).