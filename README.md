# Prex Interview

This project is the technical challenge to apply on Prex.
It's an Angular/Ionic app to have your own movie list.

Angular Version: 17.0.6
Ionic version: 7

Libraries used:
- Ionic UI Components
- Firebase (Angular/fire)

Steps to run the project:
1) Copy and paste the environment configuration for Firebase (without this, the login will not work). The destination file is `environment.ts`
2) Install and use Node 20 (Probably you can use a lower version, but I developed with 20)
   - You can use NVM and execute `nvm install 20` and `nvm use 20`.
3) Install Angular 17
4) Execute `npm i` in your terminal
5) Check if Ionic is installed on your computer. If not, execute `npm i -g @ionic/cli` in your terminal
6) Run the app with `ionic serve`

Things to improve:
- Better UX creating an account
- Better UI (Right now is really simple, REALLY simple)
- Use Firestore to save the movie list according to the user. Now I'm just using the localstorage
- Probably implements RxJs (I could have used it now, but it would have been over-engineering)
- Add some Toasts to notify what it's happening to the user
- Unit testing
