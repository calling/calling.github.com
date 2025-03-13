---
layout: post
title: How I Use Cursor
published: true
---
I've sharing how I use cursor with some folks, and figured I'd gather all of these tips in a single single document that's easy to share.

1. Use claude-3.7-sonnet. It is way better than the default. You can use claude-3.7-sonnet-thinking too, but it just takes longer. Better for architectural questions.
![Cursor change model](/assets/images/posts/2025-03-12-how-i-use-cursor/change-model.png)

2. You can change the mode of chat between "Agent" and "Ask". "Agent" makes code changes, "Ask" does not.
![Cursor change mode](/assets/images/posts/2025-03-12-how-i-use-cursor/change-mode.png)

3. If you find Cursor getting confused, you can do a few things about it.
    1. Give it explicit context. You can do things like reference specific files with `@`. E.g. `Change @my_file_name.vue to use the @my_other_file.vue module`
    2. Give it explicit cursor rules context. E.g. `@feature-flag-removal.mdc clean up insert_feature_flag_here`
4. You can "undo" Cursor agent changes. If Cursor makes some change you dislike, you can scroll back up in history and click "Restore checkpoint". This undoes all of the changes up to that point in chat. You can even edit the prompt and re-run it with clarifications

![Cursor restore checkpoint](/assets/images/posts/2025-03-12-how-i-use-cursor/restore-checkpoint.png)
