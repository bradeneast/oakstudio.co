---
title: Contact
layout: layouts/base.njk
menu:
  visible: true
  order: 3
---

## Let's talk.
Let us know who you are and how we can help. We'll get back to you in no time.

<form netlify name="contact" method="POST" action="/success/" class="flex" data-animate="from-bottom">
  <label class="half">
    Your Name *
    <input required type="text" name="name" />
  </label>
  <label>
    What can we help you with?
    <textarea name="message"></textarea>
  </label>
  <label>
    Email *
    <input type="email" inputmode="email" name="email" />
  </label>
  <div class="center grid gap-2" style="margin-top:2rem">
    <button class="center" type="submit">Send our way</button>
    <div class="center subtext">We don't spam or automate.</div>
  </div>
</form>
