# Mikes Mirror

My React and Typescript based smart mirror software. 

## Requirements

* NodeJs
* Yarn
* for voice recognition: `sudo apt-get install sox libsox-fmt-all libatlas-base-dev`
* keyfile for google API (contact me for how to get this)
* for speech synthesis: `sudo apt-get install gnustep-gui-runtime`
 
## Initial Setup

To install all the node dependencies:

```
yarn install
```

For Facial Recognition to work you need to perform some additional setup:

```
cd facial_recognition
sh install.sh
```

The above may or may not work depending on your platform, current setup, etc. Checkout the contents of the sh to see what needs to be done for your system.

If you are running on <= 2gb of RAM (Up Core for example) you may need to increase (or create) your swap space when performing the above due to high memory requirements when installing Dlib.

```
dd if=/dev/zero of=/swap bs=1M count=1000
mkswap /swap
chmod 0600 /swap
swapon /swap
```