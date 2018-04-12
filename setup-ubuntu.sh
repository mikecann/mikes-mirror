# Install NPM
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get update
apt-get install nodejs -y
apt-get install npm -y
apt-get install -y build-essential
nodejs -v

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update 
apt-get install yarn -y