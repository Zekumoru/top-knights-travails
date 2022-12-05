version=$1

CURRENT_VERSION=$(npm pkg get version)

if [ "$version" == "" ] ; then
  echo Provide a version number! Current version: $CURRENT_VERSION
  exit 1
fi

if [[ ! "\"$version\"" > "$CURRENT_VERSION" ]] ; then 
  echo Version number cannot be lesser than the current version $CURRENT_VERSION
  exit 1
fi 

# Cache dev properties
scripts=$(npm pkg get scripts)
devDependencies=$(npm pkg get devDependencies)
lintStaged=$(npm pkg get lint-staged)

# Prepare then publish
npm pkg delete scripts devDependencies lint-staged
json -I -f package.json -e "this.version=\"$version\""

npm publish --access=public

# Restore dev properties
json -I -f package.json -e "this.scripts=$scripts"
json -I -f package.json -e "this.devDependencies=$devDependencies"
json -I -f package.json -e "this[\"lint-staged\"]=$lintStaged"

# Commit publish
git add .
git commit -m "Publish version $version"
