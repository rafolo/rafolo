#/usr/bin/env/sh
set -e


#uncomment in debug
TRAVIS_PULL_REQUEST="false"
#TRAVIS_BUILD_NUMBER="10"
#TRAVIS_DUMP_ROOT=$PWD/cc/modules/branches/ci/sample_app-artifacts
##GH_TOKEN="052a204f8df159b9a8646327929d530c881532ff"

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

  cd sample_app

  echo -e "Starting to update sample_app\n"

  ## Backup path ##
  NOWD=$(date +"%F")
  NOWT=$(date +"%T")
  BACKUP_PATH="$NOWD-$NOWT"
  echo -e $BAK
  echo -e "\n"
  TRAVIS_DUMP_HOME=$TRAVIS_DUMP_ROOT/$TRAVIS_BUILD_NUMBER

  ## Copy ##
  echo -e "Create dump folder...\n"
  #make root dump directory
  mkdir -p $TRAVIS_DUMP_HOME

  #copy src
  echo -e "Dumping src...\n"
  mkdir $TRAVIS_DUMP_HOME/src -p #create even if exists
  #tar cf - --exclude=.git . | (cd $TRAVIS_DUMP_HOME/src && tar xvf - )

  #copy build
  echo -e "Dumping build...\n"
  mkdir $TRAVIS_DUMP_HOME/build -p #create even if exists
  #tar cf - --exclude=.git --exclude=.idea --exclude=.sass-cache --exclude=coverage --exclude=log --exclude=tmp --exclude=spec --exclude=test --exclude=node_modules . | (cd $TRAVIS_DUMP_HOME/build && tar xvf - )

  #copy doc
  echo -e "Dumping reports...\n"
  mkdir $TRAVIS_DUMP_HOME/doc/reports -p #create even if exists
  cp -R ./coverage $TRAVIS_DUMP_HOME/doc/reports/coverage

  ## GIT ##
  echo -e "git...\n"
  cd $TRAVIS_DUMP_HOME
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER "
  git push -fq origin master > /dev/null

  echo -e "Magic done...thx\n"
fi