npm version patch
PACKAGE_VERSION=$(npm show . version)
npm run build
git add .
git commit -m "update version to $PACKAGE_VERSION"
git push origin
npm publish


