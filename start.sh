#!/bin/bash

# Start Nginx
sudo  nginx 

# Start Next.js server
# /Volumes/Kali/blog/blog/
cd /Volumes/Kali/blog/blog
npm run dev

# Stop Nginx when the Next.js server is stopped
sudo  nginx -s stop
