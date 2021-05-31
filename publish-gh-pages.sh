#!/bin/sh

DOMAIN_NAME="lex"
WEBSITE_URL="https://aryagiat.github.io/lex/"

# Make sure main is committed and pushed.
echo "============ COMMIT AND PUSH UPDATES IF YOU HAVE NOT. ============"
echo "Press CTRL+C to abort publishing"
read -n 1 -s -r -p "Press any key to continue"
echo "============ FORCE COMMIT MAIN AND PUSH ============"
git add .
git commit -m "Force commit for publish-gh-pages.sh"
git push

# Copy everything from main to "gh-pages" branch
echo "============ MAKING NEW gh-pages BRANCH ============"
git checkout main
git branch -d gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages main

# Copy everything from /html directory to root directory and delete the /html directory
echo "============ UNPACKAGE /html ============"
cp -R html/. .
rm -rf html
git add .
git commit -m "deleted html..."

# Change "../" to "/lex/"
echo "============ CHANGING ../ to /$DOMAIN_NAME/ ============"
for file in *.html
do
    echo "Processing $file file..."
    sed -i "s|\.\.\/|\/$DOMAIN_NAME\/|g" $file
    sed -i "s|index\.html|$WEBSITE_URL|g" $file
done

# Finishing touches
echo "============ PUSH CHANGES OF gh-pages ============"
git add .
git commit -m "gh-pages created..."
git push -u origin gh-pages
git checkout main
echo "============ AT MAIN BRANCH ============"