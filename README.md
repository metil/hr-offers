# HR Offers

## Overview

HR Offers is a web application designed to help HR managers to create offers for candidates. The application is built with React, NextJS, TypeScript, Material UI, PostgreSQL, Apollo GraphQL, Google Firebase and Docker.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Installation

To run this project locally you need NodeJS and docker-compose, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/metil/hr-offers.git
2. **Install the Dependencies:**
   ```bash
   npm install
   ```
3. **You will need the .env file that was sent to you**
4. **Start docker-compose:**
    ```bash 
   docker-compose up -d
   ```
5. **Build:**
   ```bash
    npm run build
    ```
6. **Start:**
   ```bash
    npm run start
   ```
7. **Open your browser and go to:**
   ```bash
   http://localhost:3000
   ```
8. **Login with the credentials provided to you**

## Usage

   1. **Create a new Candidate:**
      - Click on the "Candidates" tab on the left side of the screen
      - Click on the "Create" button
      - Fill in the form and click on the "Create" button
   2. **Create a new Open Position:**
      - Click on the "Open Position" tab on the left side of the screen
      - Click on the "Create" button
      - Fill in the form and click on the "Create" button
   3. **Create a new Offer:** 
       - Click on the "Offers" tab on the left side of the screen
       - Click on the "Create" button
      - Fill in the form and click on the "Create" button
   4. **View the Offer:**
      - Click on the "Offers" tab on the left side of the screen
      - Select "Copy Link" from the "Actions" column on each offer
      - Paste the link in a new tab (incognito mode is recommended)
      - Once the offer is open then the candidate need to enter a PIN code to view the offer
      - The PIN code is a 4 digits code visible at the offers table
      - Once the PIN code is entered the candidate can view the offer
      - Once opened the offer status is set to VIEWED

## Technologies Used

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- PostgreSQL
- Apollo GraphQL
- Google Firebase
- Docker

   
