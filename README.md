# WGEC - Scientific Calculator
## Uruchamianie aplikacji
### NPM (Windows/Linux)
> $ git clone https://github.com/Regeneric/mgmt.git && cd mgmt/  
> $ npm run start

W przypadku brakujących paczek i zależności, zależy wpisać:  
> $ npm run start-deps

lub

> $ npm install  
> $ npm run start

Możliwa jest także instalacja za pomocą jednej z dostarczonych paczek:  

### Native (Linux)
**RPM (Fedora/SUSE)**:
> $ cd dist/  
> $ sudo dnf instal wgec*.rpm

**DEB (Debian/Ubuntu)**:
> $ cd dist/  
> $ sudo dpkg -i wgec*.deb

W przypadku brakujących zależności należy wpisać:  
> $ sudo apt update  
> $ sudo apt install -f

**PACMAN (Arch/Manjaro)**: 
> $ cd dist/  
> $ sudo pacman -U wgec*.pacman

**AppImage**
> $ cd dist/  
> $ chmod +x WGEC*  
> $ ./WGEC*

Po zainstalowaniu aplikacji, możemy wydać polecenie `wgec` w terminalu, lub poszukać jej w zakładce "*Utilities*", w naszym applecie aplikacji, pod nazwą `WGEC`.

### Native (Windows) 
Aplikacji należy szukać w folderze `dist/`, gdzie możliwe jest uruchomienie wersji portable, z pojedynczego pliku `.exe`, lub rozpakowanie archiwum `zip`, a następnie z jego poziomu odszukanie odpowiadającego pliku `.exe`.

## Wykorzystane biblioteki i rozwiązania
### NPM - moduły i licencje
 * node@10.11.0 - **MIT**
 * electron@4.0.4 - **MIT**
 * electron-builder@20.38.5 - **MIT**
 * chart.js@2.7.3 - **MIT**
 * chartjs-plugin-zoom@0.7.0 - **MIT**
 * plotly.js-dist@1.45.2 - **MIT**

### Linux - Xorg, Wayland, WM, DE
W przypadku uruchamiania aplikacji na systemie operacyjnym z rodziny -NIXów, wymagane są minimum dwie rzeczy:
 * Xorg lub Wayland
 * Windows Manager

Opcjonalnie może do tego dojść także:
 * Xorg lub Wayland
 * Windows Manager
 * Desktop Environment

Aplikacja została przestesowana w następujących konfiguracjach:  
**Pierwszy wariant**
 * Xorg
 * KWin
 * KDE  

**Drugi wariant**
 * Xorg
 * XFWM
 * XFCE

**Trzeci wariant**
 * Xorg
 * OpenBox

**Czwarty wariant**
 * Xorg && Wayland (wymiennie)
 * Mutter
 * GNOME Shell