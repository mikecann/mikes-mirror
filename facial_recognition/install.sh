#!/bin/bash

BASEDIR=$(dirname "$0")

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
    zip

cd ~
mkdir -p dlib
git clone -b 'v19.5' --single-branch https://github.com/davisking/dlib.git dlib/
cd  dlib/
#python3 setup.py install --yes USE_AVX_INSTRUCTIONS

cd $BASEDIR
cd facial_recognition
