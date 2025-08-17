---
title: 'Guide to Logging and Monitoring in ASP.NET Core'
date: 'Nov 9, 2023'
excerpt: '    Django is a very powerful, high level Python framework for building web applications'
cover_image: '/Logging_in_ASP_NET_Thumbnail.png'
category: '.NET Core'
author: 'Chris Claude'
author_image: '/about_me.png'
---

# Guide to Logging and Monitoring in ASP.NET Core

Having good logging and monitoring in place for your application can mean the difference between a five minutes resolution or a weekend spent troubleshooting and debugging.

We are going to explore the techniques that you can apply to create great logging entries and use tools that can make supporting and understanding your application easier.

We're going to cover the following:

- Core features of logging
- Destinations to send log entries
- Monitor your applications
- Trace activity in your apps

By the end of the article you should be able to do great logging in your applications and how to set them up for easy support and monitoring.

Deep understanding og logging

- Microsoft.Extensuins.Logging
- Other frameworks = destinations

Log levels and filters
Include and exclude Information
Exception handling and request logging

- Shield error details

Log destinations

Monitoring

Traceability

- This is an especially important concept in microservices. If you have a user interface that calls an API and that in turn calls two other APIs, and one of those calls yet another API. You need to be able to trace the flow across those calls to clearly understand what maybe affecting the user experience.
