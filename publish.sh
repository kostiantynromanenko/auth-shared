git add .
git commit -m "new changes"
npm version patch
PACKAGE_VERSION=$(npm show . version)
npm run build
git add .
git commit -m "update version to $PACKAGE_VERSION"
git tag -a "v$PACKAGE_VERSION" -m "version $PACKAGE_VERSION"
git push origin
npm publish


