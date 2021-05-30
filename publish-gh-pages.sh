#!/bin/sh

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
read -n 1 -s -r -p "Press any key to continue"

# Change "../" to "/lex/"
for file in *.html
do
    echo "Processing $file file..."
    sed -i 's/"\.\.\//"\/lex\//g' $file
done

# Finishing touches
git add .
git commit -m "gh-pages created..."
git push -u origin gh-pages
git checkout main