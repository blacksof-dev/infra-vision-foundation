apt-get update
apt-get upgrade
adduser blacksof
Blacksof2026
usermod -aG sudo blacksof
create ssh folder
inside that create authorization_key filr
nano authorization_key
create ssh key and save their
to install node js - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source .bashrc -- It install the nvm
nvm install --lts - It install the node js 
sudo apt-get install nginx


template for sites avilable 

server {
  listen 80;
  server_name 143.110.242.141;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

link site enabled
sudo ln -s /etc/nginx/sites-available/rahulGupte /etc/nginx/sites-enabled/rahulGupte
sudo nginx -t - check configuration 
sudo service nginx restart - restart 

ssh-keygen -t ed25519 -C "blacksof-vps"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com


sudo nginx -t
sudo systemctl reload nginx