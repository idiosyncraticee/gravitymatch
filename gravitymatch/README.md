ionic capacitor run
Select ios

#ONLY ONCE FOR THE COMPUTER
npm install -g firebase-tools

#TO BUILD AND DEPLOY
npm run-script build --prod
firebase login
firebase init #SELECT HOSTING AND www FOR THE PUBLIC DIRECTORY, YES FOR index.html, NO for Overwrite
firebase deploy
