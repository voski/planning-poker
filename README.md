# Planning Poker App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)
![Docker](https://img.shields.io/badge/docker-%3E%3D%201.0.0-blue)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
- [Running the Application](#running-the-application)
  - [Locally](#locally)
  - [Using Docker](#using-docker)
    - [Build the Docker Image](#build-the-docker-image)
    - [Run the Docker Container](#run-the-docker-container)
    - [Managing the Docker Container](#managing-the-docker-container)
  - [Using Docker Compose (Optional)](#using-docker-compose-optional)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The **Planning Poker App** is a real-time, collaborative tool designed to facilitate agile teams in estimating and story pointing. Utilizing **Socket.io**, it allows multiple participants to join a single room, cast votes using the Fibonacci sequence, and reveal all votes once everyone has voted. The application is containerized with **Docker** for easy deployment and consistency across environments.

## Features

- **Real-Time Communication:** Powered by Socket.io for instant updates.
- **Single Room:** All participants share the same estimation session.
- **Participant Management:** Ask for participant names and automatically remove players upon disconnection.
- **Fibonacci Card Scheme:** Use the Fibonacci sequence for story point estimation.
- **Reset Game:** Reset votes for all participants with a single button click.
- **Automatic Vote Revelation:** Automatically reveal all votes once every participant has voted.
- **Docker Support:** Easily containerize and deploy the application using Docker.

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js (v18 or later) installed. You can download it from [here](https://nodejs.org/).
- **Docker (Optional):** If you plan to run the application using Docker. Download and install from [here](https://www.docker.com/get-started).

### Install Dependencies

```
npm install
```

> **Note:** This will install all the necessary Node.js dependencies listed in `package.json`.

## Running the Application

You can run the application either **locally** or using **Docker**.

### Locally

1. **Start the Server:**

```
node server.js
```

   Alternatively, if you have [Nodemon](https://nodemon.io/) installed for automatic restarts during development:

```
nodemon server.js
```

2. **Access the App:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

   > **Tip:** Open multiple browser tabs or windows to simulate different participants.

### Using Docker

Containerizing your application ensures consistency across different environments and simplifies deployment.

#### Build the Docker Image

Navigate to your project root directory (where the `Dockerfile` is located) and build the Docker image.

```
docker build -t planning-poker-app .
```

- **`-t planning-poker-app`**: Tags the image with the name `planning-poker-app`.
- **`.`**: Specifies the current directory as the build context.

#### Run the Docker Container

Once the image is built, run it as a container.

```
docker run -d -p 3000:3000 --name planning-poker-container planning-poker-app
```

- **`-d`**: Runs the container in detached mode (in the background).
- **`-p 3000:3000`**: Maps port `3000` of your local machine to port `3000` of the container.
- **`--name planning-poker-container`**: Names the container for easier management.
- **`planning-poker-app`**: Specifies the image to run.

#### Managing the Docker Container

- **View Running Containers:**

```
docker ps
```

- **Stop the Container:**

```
docker stop planning-poker-container
```

- **Remove the Container:**

```
docker rm planning-poker-container
```

- **View Logs:**

```
docker logs planning-poker-container
```

- **Rebuild and Restart (After Code Changes):**

```
docker build -t planning-poker-app .
docker stop planning-poker-container
docker rm planning-poker-container
docker run -d -p 3000:3000 --name planning-poker-container planning-poker-app
```

## Usage

1. **Join the Game:**

   - Enter your name in the input field.
   - Click the **Join** button or press the `Enter` key.

2. **Cast Your Vote:**

   - Select a Fibonacci card representing your estimate.
   - Once all participants have voted, the votes will automatically reveal.

3. **Reset the Game:**

   - Click the **Reset Game** button to clear all votes and start a new estimation round.


## License

This project is licensed under the [MIT License](LICENSE).
