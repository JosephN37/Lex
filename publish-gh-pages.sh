#!/bin/sh

DOMAIN_NAME="lex"
WEBSITE_URL="https://aryagiat.github.io/lex/"

# Make sure main is committed and pushed.
git add .
git commit -m "Force commit for auto publish gh pages"
git push

# Copy everything from main to "gh-pages" branch
git checkout main
git branch -d gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages main

# Copy everything from /html directory to root directory and delete the /html directory
cp -R html/. .
rm -rf html
git add .
git commit -m "deleted html..."

# Change "../" to "/lex/"
for file in *.html
do
    echo "Processing $file file..."
    sed -i "s|\.\.\/|\/$DOMAIN_NAME\/|g" $file
    sed -i "s|index\.html|$WEBSITE_URL|g" $file
done

# Finishing touches
git add .
git commit -m "gh-pages created..."
git push -u origin gh-pages
git checkout main