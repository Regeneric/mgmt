# Develop Branch
## Dependencies
Install them all:  
`npm install`

Install one at a time:  
`npm install electron@4.0.4 --save`  
`npm install electron-builder@20.38.5 --save`  
`npm install chart.js@2.7.3 --save`  
`npm install chartjs-plugin-zoom@0.7.0`  
`npm install plotly.js-dist@1.45.2 --save`  

## Commands
`npm run current` - run the app version from current branch  
`npm run dev` - develop version start  
`npm run pack` - pack the app and make it ready to ship  
`npm run build` - build the app and get the final product  
`npm run start` - production version start  

## Inslling package
### Debian/Ubuntu
`sudo apt update && sudo apt upgrade`  
`sudo dpkg -i wgec*.deb`  

In the case of missing deps:  
`sudo apt update && sudo apt upgrade`  
`sudo apt install -f`  

And then you can run app with:  
`wgec`  

### Fedora/SUSE
`sudo dnf install wgec*.rpm`  

And then you can run app with:  
`wgec`  

### Arch/Manjaro
`sudo pacman -U wgec*.pacman`

And then you can run app with:  
`wgec`  