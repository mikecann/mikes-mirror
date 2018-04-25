#!/bin/bash

THISDIR=$(pwd)

sudo apt-get install -y --fix-missing \
    build-essential \
    cmake \
    gfortran \
    git \
    wget \
    curl \
    graphicsmagick \
    libgraphicsmagick1-dev \
    libatlas-dev \
    libavcodec-dev \
    libavformat-dev \
    libboost-all-dev \
    libgtk2.0-dev \
    libjpeg-dev \
    liblapack-dev \
    libswscale-dev \
    pkg-config \
    python3-dev \
    python3-numpy \
    software-properties-common \
    python3-setuptools \
    zip

cd ~
rm -rf dlib
mkdir -p dlib
git clone -b 'v19.5' --single-branch https://github.com/davisking/dlib.git dlib/
cd  ~/dlib
sudo python3 setup.py install #--yes USE_AVX_INSTRUCTIONS

cd $THISDIR

sudo pip3 install -r requirements.txt
sudo python3 setup.py install
